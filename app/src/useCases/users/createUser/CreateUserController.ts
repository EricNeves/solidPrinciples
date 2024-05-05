import { Request, Response } from "express";
import { ICreateUserUseCase } from "./ICreateUserUseCase";
import { IValidator } from "../../../utils/validation/IValidator";

export class CreateUserController {
  constructor(
    private createUserUseCase: ICreateUserUseCase,
    private validator: IValidator
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    this.validator.validate(request.body);

    await this.createUserUseCase.execute(request.body);

    return response.status(201).json({
      message: "User created successfully.",
    });
  }
}
