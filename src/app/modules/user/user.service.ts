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

export const UserService = {
  createUserInDb,
  getAllUserFromDB,
  getSingleUserById,
  updateUserFromDb,
  deleteSingleUserFromDB,
  insertSingleOrderinDB,
};
