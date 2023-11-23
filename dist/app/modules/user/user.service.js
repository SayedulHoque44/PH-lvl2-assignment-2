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
exports.UserService = void 0;
const user_model_1 = require("../user.model");
// create user
const createUserInDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(userData);
    return result;
});
// get all user
const getAllUserFromDB = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield user_model_1.UserModel.find();
        return result;
    });
};
// get single userById
const getSingleUserById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        // check user found or not
        const existingUser = yield user_model_1.UserModel.isUserExists(id);
        if (existingUser) {
            return existingUser;
        }
        else {
            throw new Error("User not found");
        }
    });
};
// update user by id
const updateUserFromDb = function (id, userData) {
    return __awaiter(this, void 0, void 0, function* () {
        // check user found or not
        const existingUser = yield user_model_1.UserModel.isUserExists(id);
        if (existingUser) {
            const result = yield user_model_1.UserModel.updateOne({ userId: id }, userData);
            return result;
        }
        else {
            throw new Error("User not found");
        }
    });
};
// delete a User
const deleteSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.UserModel.isUserExists(id);
    if (existingUser) {
        const result = yield user_model_1.UserModel.deleteOne({ userId: id });
        return result;
    }
    else {
        throw new Error("User not found");
    }
});
exports.UserService = {
    createUserInDb,
    getAllUserFromDB,
    getSingleUserById,
    updateUserFromDb,
    deleteSingleUserFromDB,
};
