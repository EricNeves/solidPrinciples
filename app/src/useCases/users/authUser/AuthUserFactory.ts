import { PostgresUserRepository } from "../../../repositories/features/PostgresUserRepository";
import { Validator } from "../../../utils/validation/features/Validator";
import { Bcrypt } from "../../../utils/bcrypt/features/Bcrypt";
import { AuthUserController } from "./AuthUserController";
import { JwtHelper } from "../../../utils/jwt/features";
import { Jwt } from "../../../utils/jwt/features/Jwt";
import { AuthUserUseCase } from "./AuthUserUseCase";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import Joi from "joi";

export class AuthUserFactory {
  static generateInstance() {
    const userRepository = new PostgresUserRepository(
      new PrismaClient(),
      new Bcrypt(bcrypt)
    );

    const authSchema = Joi.object({
      email:    Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const jwt = new Jwt(new JwtHelper());

    const authUserUseCase    = new AuthUserUseCase(userRepository, jwt);
    const validator          = new Validator(authSchema);
    const authUserController = new AuthUserController(
      authUserUseCase,
      validator
    );

    return authUserController;
  }
}
