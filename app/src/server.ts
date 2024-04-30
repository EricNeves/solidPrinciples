import express, { Express } from "express";

const app: Express = express();

import userRouter from './routes/user'

const PORT = process.env.PORT || 3030

app.use(express.json())

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})