import cors from "cors";
import express, { Request, Response } from "express";
import { UserRoutes } from "./app/modules/user/user.route";
export const app = express();

// middleware
app.use(express.json());
app.use(cors());

// api endpoint
app.use("/api/users/", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
