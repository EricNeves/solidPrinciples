import { Request, Response } from "express";
import { IAuthUserUseCase } from "./IAuthUserUseCase";
import { IValidator } from "../../../utils/validation/IValidator";

export class AuthUserController {
  constructor(
    private authUserUseCase: IAuthUserUseCase,
    private validator: IValidator
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      this.validator.validate(request.body);

      const auth = await this.authUserUseCase.execute(request.body);

      return response.status(200).json({
        jwt: auth
      });
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || "Sorry, unexpected error.",
      });
    }
  }
}
