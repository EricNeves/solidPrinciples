import express, { Express, NextFunction, Request, Response } from "express";
import { serve, setup } from "swagger-ui-express";
import "express-async-errors";
import cors from "cors";

import { handleError } from "./middlewares/handleError";
import swaggerSchema from "./swagger.json";

const app: Express = express();

import userRouter from "./routes/user";
import homeRouter from "./routes/home";

const PORT = process.env.PORT || 3030;

app.use(
  cors({
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use('/', homeRouter)
app.use("/doc", serve, setup(swaggerSchema));
app.use("/users", userRouter);
app.use(handleError);
app.use((request: Request, response: Response, next: NextFunction) => {
  response.status(404).json({
    message: "Sorry, endpoint not found.",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
});
