import { PostgresUserRepository } from "../../../repositories/features/PostgresUserRepository";
import { Validator } from "../../../utils/validation/features/Validator";
import { BCryptHelper } from '../../../utils/bcrypt/features/index'
import { Bcrypt } from "../../../utils/bcrypt/features/Bcrypt";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";


export class CreateUserFactory {
  static generateInstance() {
    const postgresUserRepository = new PostgresUserRepository(
      new PrismaClient(),
      new Bcrypt(new BCryptHelper())
    );

    const userSchema = Joi.object({
      name:     Joi.string().required(),
      email:    Joi.string().email().required(),
      password: Joi.string().min(4).required(),
    });

    const bcryptDep            = new Bcrypt(new BCryptHelper())
    const createUserUseCase    = new CreateUserUseCase(postgresUserRepository, bcryptDep);
    const validator            = new Validator(userSchema);
    const createUserController = new CreateUserController(
      createUserUseCase,
      validator
    );

    return createUserController;
  }
}
