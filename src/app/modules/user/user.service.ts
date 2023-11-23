import { UserModel } from "../user.model";
import { TOrder, TUser } from "./user.interface";

// create user
const createUserInDb = async (userData: TUser) => {
  const result = await UserModel.create(userData);

  return result;
};
// get all user
const getAllUserFromDB = async function () {
  const result = await UserModel.find();

  return result;
};
// get single userById
const getSingleUserById = async function (id: number) {
  // check user found or not
  const existingUser = await UserModel.isUserExists(id);

  if (existingUser) {
    return existingUser;
  } else {
    throw new Error("User not found");
  }
};

// update user by id
const updateUserFromDb = async function (id: number, userData: TUser) {
  // check user found or not
  const existingUser = await UserModel.isUserExists(id);

  if (existingUser) {
    const result = await UserModel.updateOne({ userId: id }, userData);

    return result;
  } else {
    throw new Error("User not found");
  }
};

// delete a User
const deleteSingleUserFromDB = async (id: number) => {
  const existingUser = await UserModel.isUserExists(id);

  if (existingUser) {
    const result = await UserModel.deleteOne({ userId: id });

    return result;
  } else {
    throw new Error("User not found");
  }
};

// insert a single order
const insertSingleOrderinDB = async (id: number, singleOrder: TOrder) => {
  const result = await UserModel.updateOne(
    { userId: id },
    {
      $push: {
        orders: singleOrder, // uniq element add hbe array te
      },
    },
  );

  return result;
};

// get all order from specific user
const getAllOrderFromSpecificUserDB = async (id: number) => {
  const existingUser = await UserModel.isUserExists(id);

  if (existingUser) {
    const result = await UserModel.findOne(
      { userId: id },
      { orders: 1, _id: 0 },
    );

    return result;
  } else {
    throw new Error("User not found");
  }
};
// calculateOrder Price
const calculateOrderPriceOfUserDB = async (id: number) => {
  const existingUser = await UserModel.isUserExists(id);

  if (existingUser) {
    if (!(await UserModel.isOrdersHas(id))) {
      return { totalPrice: 0 };
    }

    const result = await UserModel.aggregate([
      // stage-1 get exprectation matched user
      {
        $match: {
          userId: id,
        },
      },
      // stage-1 brekdown the array using $unwing
      {
        $unwind: "$orders",
      },
      // stage-1 group by name to get all oders total price
      {
        $group: {
          _id: "$username",
          totalPrice: {
            $sum: "$orders.price",
          },
        },
      },
      // stage-1 show data whatever want using $projection
      {
        $project: {
          totalPrice: 1,
          _id: 0,
        },
      },

      {
        $unwind: "$totalPrice",
      },
    ]);

    return result[0];
  } else {
    throw new Error("User not found");
  }
};

// user service exports
export const UserService = {
  createUserInDb,
  getAllUserFromDB,
  getSingleUserById,
  updateUserFromDb,
  deleteSingleUserFromDB,
  insertSingleOrderinDB,
  getAllOrderFromSpecificUserDB,
  calculateOrderPriceOfUserDB,
};
