import express, { Express, NextFunction, Request, Response } from "express";
import "express-async-errors";

import { handleError } from "./middlewares/handleError"
 
const app: Express = express();

import userRouter from "./routes/user";

const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use("/users", userRouter);
app.use(handleError);
app.use((request: Request, response: Response, next: NextFunction) => {
  response.status(404).json({
    message: "Sorry, endpoint not found."
  })
})

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
