import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { UserRoutes } from "./app/modules/user/user.route";
export const app = express();

// middleware
app.use(express.json());
app.use(cors());

// api endpoint
app.use("/api/users/", UserRoutes);

// Global Error handling middleware for reduce server crash
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    message: "Something went wrong! :(",
    error: {
      code: 500,
      description: "Please Check Your Data or Code",
      serverError: err,
    },
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: " Hello World! let me handle the world :) ",
  });
});
