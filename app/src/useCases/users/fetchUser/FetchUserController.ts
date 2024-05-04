import { Request, Response } from "express";
import { IFetchUserUseCase } from "./IFetchUserUseCase";

export class FetchUserController {
  constructor(private fetchUserUseCase: IFetchUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const user = await this.fetchUserUseCase.execute({
        email: request.customer?.email ?? "",
      });

      return response.status(200).json({
        user,
      });
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || "Sorry, unexpected error.",
      });
    }
  }
}
