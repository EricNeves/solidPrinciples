import { IDeleteUserUseCase } from "./IDeleteUserUseCase";
import { Request, Response } from "express";

export class DeleteUserController {
  constructor(private deleteUserUseCase: IDeleteUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const user = await this.deleteUserUseCase.execute({
        email: request.customer?.email ?? "",
      });

      return response.status(200).json({
        msg: user,
      });
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || "Sorry, unexpected error.",
      });
    }
  }
}
