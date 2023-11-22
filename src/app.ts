import cors from "cors";
import express, { Request, Response } from "express";
export const app = express();

// middleware
app.use(express.json());
app.use(cors());

// api endpoint

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
