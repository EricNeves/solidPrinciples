import { IValidator } from "../../../utils/validation/IValidator";
import { IEditUserUseCase } from "./IEditUserUseCase";
import { Request, Response } from "express";

export class EditUserController {
  constructor(
    private editUserUseCase: IEditUserUseCase,
    private validator: IValidator
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    this.validator.validate(request.body);

    const user = await this.editUserUseCase.execute({
      name: request.body.name,
      email: request.customer?.email ?? "",
    });

    return response.status(200).json({
      user,
    });
  }
}
