import { Request, Response } from "express";
import { UserModel } from "../user.model";
import { UserService } from "./user.service";
import { OrderZodSchema, UserZodSchema } from "./user.zod.validation";

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
  if (err.message) {
    return err.message;
  }

  return "Somthing Went Wrong";
};

// createUser controller
const createUser = async (req: Request, res: Response) => {
  try {
    const UserData = req.body;

    // Zod validation
    const UserZodVal = UserZodSchema.parse(UserData);

    // create user req
    const result = await UserService.createUserInDb(UserZodVal);

    //success respone
    res.status(200).json({
      success: true,
      message: "User Created Successfully!",
      data: result,
    });
  } catch (err: any) {
    // Error Response
    res.status(400).json({
      success: false,
      message: ErrorResMessag(err),
      error: {
        code: 400,
        description: ErrorResMessag(err),
      },
    });
  }
};

// getAllUser controller
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUserFromDB();
    //success respone
    res.status(200).json({
      success: true,
      message:
        result.length > 0
          ? "Users fetched successfully!"
          : "There are no Records",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: ErrorResMessag(err),
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

// get single user
const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserService.getSingleUserById(Number(userId));
    //success respone
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};
// update a User
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;

    const result = await UserService.updateUserFromDb(Number(userId), userData);
    //success respone
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

// delete a user
const deletUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const result = await UserService.deleteSingleUserFromDB(Number(userId));
    //success respone
    res.status(200).json({
      success: true,
      message: "User Deleted successfully!",
      data: null,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

// insert single order in user
const insertSingleOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = req.body;

    // check is user exists
    const existingUser = UserModel.isUserExists(Number(userId));

    if (await existingUser) {
      // exists user
      const orderDataValidate = OrderZodSchema.parse(orderData);
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const result = await UserService.insertSingleOrderinDB(
        Number(userId),
        orderDataValidate,
      );
      //success respone
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: null,
      });
    } else {
      // not exists user
      // to catch user not found err
      res.status(404).json({
        success: false,
        message: "User not Found!",
        error: {
          code: 404,
          description: "User not Found!",
        },
      });
    }
  } catch (err: any) {
    // to catch zod/other error with error message
    res.status(400).json({
      success: false,
      message: ErrorResMessag(err),
      error: {
        code: 404,
        description: ErrorResMessag(err),
      },
    });
  }
};

// get all order from db
const getAllOrderFromSpecificUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getAllOrderFromSpecificUserDB(
      Number(userId),
    );
    //success respone
    res.status(200).json({
      success: true,
      message: "Orders Retrive successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

// calculate Order Price Of User
const calculateOrderPriceOfUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.calculateOrderPriceOfUserDB(
      Number(userId),
    );
    //success respone
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

// Controllers
export const UserControllers = {
  createUser,
  getAllUser,
  getUser,
  updateSingleUser,
  deletUser,
  insertSingleOrder,
  getAllOrderFromSpecificUser,
  calculateOrderPriceOfUser,
};
