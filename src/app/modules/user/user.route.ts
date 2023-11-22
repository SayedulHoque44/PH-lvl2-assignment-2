import express from "express";
import { UserControllers } from "./user.controllers";

const router = express.Router();

// create User
router.post("/", UserControllers.createUser);

export const UserRoutes = router;
