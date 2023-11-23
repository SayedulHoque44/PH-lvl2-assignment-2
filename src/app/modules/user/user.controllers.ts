import { Request, Response } from "express";
import { UserService } from "./user.service";
import { UserZodSchema } from "./user.zod.validation";

// custom Error fn
const ErrorResMessag = (err: any) => {
  // checking is the error come from mongoose or validator package

  // its for mongoose uniqe validate
  if (err.code === 11000) {
    let fieldName;
    for (const i in err.keyValue) {
      fieldName = i;
    }
    return `${err.keyValue[fieldName as string]} already Exits!`;
  }

  //its for mongoose required validate
  if (err.errors) {
    let fieldName;
    for (const i in err.errors) {
      fieldName = i;
    }
    return err.errors[fieldName as string].message;
  }

  return "Somthing Went Wrong";
};

// createUser controller
const createUser = async (req: Request, res: Response) => {
  try {
    const UserData = req.body;

    const UserZodVal = UserZodSchema.parse(UserData);

    // db req
    const result = await UserService.createUserInDb(UserZodVal);

    res.status(200).json({
      success: true,
      message: "User Created Successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(200).json({
      success: false,
      message: ErrorResMessag(err),
      data: err,
    });
  }
};

// getAllUser controller

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUserFromDB();

    res.status(200).json({
      success: true,
      message:
        result.length > 0
          ? "Users Retrive Successfully!"
          : "There are no Records",
      data: result,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: ErrorResMessag(err),
      data: err,
    });
  }
};

// get single user
const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const result = await UserService.getSingleUserById(Number(userId));

    res.status(200).json({
      success: true,
      message: "User Retrive Successfully!",
      data: result,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: ErrorResMessag(err),
      data: err,
    });
  }
};

// Controllers
export const UserControllers = {
  createUser,
  getAllUser,
  getUser,
};
