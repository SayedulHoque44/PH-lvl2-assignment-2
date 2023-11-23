import express from "express";
import { UserControllers } from "./user.controllers";

const router = express.Router();

// create User
router.post("/", UserControllers.createUser);
// get all User
router.get("/", UserControllers.getAllUser);
// get single user by id
router.get("/:userId", UserControllers.getUser);
// update single user
router.put("/:userId", UserControllers.updateSingleUser);
// delete single user
router.delete("/:userId", UserControllers.deletUser);
// delete single user
router.put("/:userId/orders", UserControllers.insertSingleOrder);
// get all order from specific user
router.get("/:userId/orders", UserControllers.getAllOrderFromSpecificUser);
// get all order total price from specific user
router.get(
  "/:userId/orders/total-price",
  UserControllers.calculateOrderPriceOfUser,
);

export const UserRoutes = router;
