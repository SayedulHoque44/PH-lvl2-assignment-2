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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_model_1 = require("../user.model");
const user_service_1 = require("./user.service");
const user_zod_validation_1 = require("./user.zod.validation");
// custom Error fn
const ErrorResMessag = (err) => {
    // checking is the error come from mongoose or validator package
    // its for mongoose uniqe validate
    if (err.code === 11000) {
        let fieldName;
        for (const i in err.keyValue) {
            fieldName = i;
        }
        return `${err.keyValue[fieldName]} already Exits!`;
    }
    //its for mongoose required validate
    if (err.errors) {
        let fieldName;
        for (const i in err.errors) {
            fieldName = i;
        }
        return err.errors[fieldName].message;
    }
    if (err.message) {
        return err.message;
    }
    return "Somthing Went Wrong";
};
// createUser controller
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserData = req.body;
        const UserZodVal = user_zod_validation_1.UserZodSchema.parse(UserData);
        // db req
        const result = yield user_service_1.UserService.createUserInDb(UserZodVal);
        res.status(200).json({
            success: true,
            message: "User Created Successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(200).json({
            success: false,
            message: ErrorResMessag(err),
            data: err,
        });
    }
});
// getAllUser controller
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserService.getAllUserFromDB();
        res.status(200).json({
            success: true,
            message: result.length > 0
                ? "Users fetched successfully!"
                : "There are no Records",
            data: result,
        });
    }
    catch (err) {
        res.status(200).json({
            success: false,
            message: ErrorResMessag(err),
            data: err,
        });
    }
});
// get single user
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserService.getSingleUserById(Number(userId));
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
});
// update a User
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const userData = req.body;
        const result = yield user_service_1.UserService.updateUserFromDb(Number(userId), userData);
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
});
// delete a user
const deletUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const result = yield user_service_1.UserService.deleteSingleUserFromDB(Number(userId));
        res.status(200).json({
            success: true,
            message: "User Deleted successfully!",
            data: null,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
});
// insert single order in user
const insertSingleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const orderData = req.body;
        // check is user exists
        const existingUser = user_model_1.UserModel.isUserExists(Number(userId));
        if (yield existingUser) {
            // exists user
            const orderDataValidate = user_zod_validation_1.OrderZodSchema.parse(orderData);
            // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
            const result = yield user_service_1.UserService.insertSingleOrderinDB(Number(userId), orderDataValidate);
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: null,
            });
        }
        else {
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
    }
    catch (err) {
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
});
// get all order from db
const getAllOrderFromSpecificUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserService.getAllOrderFromSpecificUserDB(Number(userId));
        res.status(200).json({
            success: true,
            message: "Orders Retrive successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
});
// calculate Order Price Of User
const calculateOrderPriceOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserService.calculateOrderPriceOfUserDB(Number(userId));
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
});
// Controllers
exports.UserControllers = {
    createUser,
    getAllUser,
    getUser,
    updateSingleUser,
    deletUser,
    insertSingleOrder,
    getAllOrderFromSpecificUser,
    calculateOrderPriceOfUser,
};
