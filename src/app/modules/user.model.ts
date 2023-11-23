import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../config";
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModelWithMethods,
} from "./user/user.interface";
//
const OrderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, "Product Name is Required!"],
  },
  price: {
    type: Number,
    required: [true, "Price Name is Required!"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity Name is Required!"],
  },
});

// FullNameSchema
const AddressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, "Street is Required!"],
  },
  city: {
    type: String,
    required: [true, "City is Required!"],
  },
  country: {
    type: String,
    required: [true, "Country is Required!"],
  },
});
// FullNameSchema
const FullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, "UserId is Required!"],
  },
  lastName: {
    type: String,
    required: [true, "UserId is Required!"],
  },
});

// UserSchema
const UserSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, "UserId is Required!"],
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    required: [true, "UserName is Required!"],
  },
  password: {
    type: String,
    required: [true, "Password is Required!"],
  },
  fullName: {
    type: FullNameSchema,
    required: [true, "fullName is Required!"],
  },
  age: {
    type: Number,
    required: [true, "age is Required!"],
  },
  email: {
    type: String,
    required: [true, "Email is Required!"],
  },
  isActive: {
    type: Boolean,
    required: [true, "isActive is Required!"],
    default: true,
  },
  hobbies: {
    type: [String],
  },
  address: {
    type: AddressSchema,
    required: [true, "Address is Required!"],
  },
  orders: {
    type: [OrderSchema],
  },
});

// pre -> save -> hash the password
UserSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(user.password, Number(config.Bcrypt_salts));
  next();
});
// post -> save
// UserSchema.post("save", async function (UpdatedDoc, next) {
//   next();
// });

// pre -> find -> apply $projection

UserSchema.pre("find", async function (next) {
  this.find().projection({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
    _id: 0,
  });
  next();
});

// --> using buildin methods
UserSchema.methods.toJSON = function () {
  const userData = this.toObject();
  delete userData.password;
  return userData;
};
//
// --> coustom statics --> isUserExists
UserSchema.statics.isUserExists = async function (id: number) {
  const existingUser = await UserModel.findOne({ userId: id });

  return existingUser;
};

UserSchema.statics.isOrdersHas = async function (id: number) {
  let hasOrders = false;
  const user = await this.findOne({ userId: id }, { orders: 1, _id: 0 });

  // keep it mind -> before use this isOrdershas we have to use isUserExits or else user?.orders? has possibility to undefinded
  if (user?.orders?.length > 0) {
    hasOrders = true;
  }

  return hasOrders;
};
// User Model
export const UserModel = model<TUser, UserModelWithMethods>("User", UserSchema);
