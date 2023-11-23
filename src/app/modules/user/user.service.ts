import { UserModel } from "../user.model";
import { TUser } from "./user.interface";

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
  const result = await UserModel.findOne({ userId: id });

  return result;
};

export const UserService = {
  createUserInDb,
  getAllUserFromDB,
  getSingleUserById,
};
