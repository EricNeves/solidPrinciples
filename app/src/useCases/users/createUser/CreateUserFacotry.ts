import { PostgresUserRepository } from "../../../repositories/features/PostgresUserRepository";
import { Bcrypt } from "../../../utils/bcrypt/features/Bcrypt";
import { Validator } from "../../../utils/validation/features/Validator";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import Joi from "joi";

export class CreateUserFactory {
  static generateInstance() {
    const postgresUserRepository = new PostgresUserRepository(
      new PrismaClient(),
      new Bcrypt(bcrypt)
    );

    const userSchema = Joi.object({
      name:     Joi.string().required(),
      email:    Joi.string().email().required(),
      password: Joi.string().min(4).required(),
    });

    const bcryptDep            = new Bcrypt(bcrypt)
    const createUserUseCase    = new CreateUserUseCase(postgresUserRepository, bcryptDep);
    const validator            = new Validator(userSchema);
    const createUserController = new CreateUserController(
      createUserUseCase,
      validator
    );

    return createUserController;
  }
}
