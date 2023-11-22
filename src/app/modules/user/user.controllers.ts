import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const UserData = req.body;

    // db req
    const result = await UserService.createUserInDb(UserData);

    res.status(200).json({
      success: true,
      message: "User Created Successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(200).json({
      success: true,
      message: err.message || "Somthing Went Wrong",
      data: err,
    });
  }
};

// Controllers
export const UserControllers = {
  createUser,
};
