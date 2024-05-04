import { PostgresUserRepository } from "../../../repositories/features/PostgresUserRepository";
import { Validator } from "../../../utils/validation/features/Validator";
import { Bcrypt } from "../../../utils/bcrypt/features/Bcrypt";
import { BCryptHelper } from "../../../utils/bcrypt/features";
import { EditUserController } from "./EditUserController";
import { EditUserUseCase } from "./EditUserUseCase";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";

export class EditUserFactory {
  static generateInstance() {
    const userRepository = new PostgresUserRepository(
      new PrismaClient(),
      new Bcrypt(new BCryptHelper())
    );

    const editSchema = Joi.object({
      name: Joi.string().required(),
    });

    const editUserUseCase    = new EditUserUseCase(userRepository);
    const validator          = new Validator(editSchema);
    const editUserController = new EditUserController(
      editUserUseCase,
      validator
    );

    return editUserController;
  }
}
