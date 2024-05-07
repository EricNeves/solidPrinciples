import { Router, Request, Response } from "express";

const router = Router()

router.get('/', (request: Request, response: Response) => {
  response.status(200).json({
    author: "🦆 Eric Neves <github.com/ericneves>",
    info: "/doc"
  })
})

export default router 