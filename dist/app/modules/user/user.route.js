"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("./user.controllers");
const router = express_1.default.Router();
// create User
router.post("/", user_controllers_1.UserControllers.createUser);
// get all User
router.get("/", user_controllers_1.UserControllers.getAllUser);
// get single user by id
router.get("/:userId", user_controllers_1.UserControllers.getUser);
// update single user
router.put("/:userId", user_controllers_1.UserControllers.updateSingleUser);
// delete single user
router.delete("/:userId", user_controllers_1.UserControllers.deletUser);
// delete single user
router.put("/:userId/orders", user_controllers_1.UserControllers.insertSingleOrder);
// get all order from specific user
router.get("/:userId/orders", user_controllers_1.UserControllers.getAllOrderFromSpecificUser);
// get all order total price from specific user
router.get("/:userId/orders/total-price", user_controllers_1.UserControllers.calculateOrderPriceOfUser);
exports.UserRoutes = router;
