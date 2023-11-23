"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
//
const OrderSchema = new mongoose_1.Schema({
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
const AddressSchema = new mongoose_1.Schema({
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
const FullNameSchema = new mongoose_1.Schema({
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
const UserSchema = new mongoose_1.Schema({
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
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.Bcrypt_salts));
        next();
    });
});
// post -> save
// UserSchema.post("save", async function (UpdatedDoc, next) {
//   next();
// });
// pre -> find -> apply $projection
UserSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
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
});
// --> using buildin methods
UserSchema.methods.toJSON = function () {
    const userData = this.toObject();
    delete userData.password;
    return userData;
};
//
// --> coustom statics --> isUserExists
UserSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.UserModel.findOne({ userId: id });
        return existingUser;
    });
};
UserSchema.statics.isOrdersHas = function (id) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let hasOrders = false;
        const user = yield this.findOne({ userId: id }, { orders: 1, _id: 0 });
        // keep it mind -> before use this isOrdershas we have to use isUserExits or else user?.orders? has possibility to undefinded
        if (((_a = user === null || user === void 0 ? void 0 : user.orders) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            hasOrders = true;
        }
        return hasOrders;
    });
};
// User Model
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
