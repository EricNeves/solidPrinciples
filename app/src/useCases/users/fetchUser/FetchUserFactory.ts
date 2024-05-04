import { PostgresUserRepository } from "../../../repositories/features/PostgresUserRepository";
import { Bcrypt } from "../../../utils/bcrypt/features/Bcrypt";
import { BCryptHelper } from "../../../utils/bcrypt/features";
import { FetchUserController } from "./FetchUserController";
import { FetchUserUseCase } from "./FetchUserUseCase";
import { PrismaClient } from "@prisma/client";

export class FetchUserFactory {
  static generateInstance() {
    const userRepository = new PostgresUserRepository(
      new PrismaClient(),
      new Bcrypt(new BCryptHelper())
    );

    const fetchUserUseCase    = new FetchUserUseCase(userRepository)
    const fetchUserController = new FetchUserController(fetchUserUseCase)

    return fetchUserController;
  }
}
