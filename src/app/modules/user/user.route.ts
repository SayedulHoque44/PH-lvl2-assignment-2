import express from "express";
import { UserControllers } from "./user.controllers";

const router = express.Router();

// create User
router.post("/", UserControllers.createUser);
// get all User
router.get("/", UserControllers.getAllUser);
// get single user by id
router.get("/:userId", UserControllers.getUser);

export const UserRoutes = router;
