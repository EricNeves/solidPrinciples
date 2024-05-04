import { PostgresUserRepository } from "../../../repositories/features/PostgresUserRepository";
import { BCryptHelper } from "../../../utils/bcrypt/features";
import { Bcrypt } from "../../../utils/bcrypt/features/Bcrypt";
import { DeleteUserController } from "./DeleteUserController";
import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { PrismaClient } from "@prisma/client";

export class DeleteUserFactory {
  static generateInstance() {
    const userRepository = new PostgresUserRepository(
      new PrismaClient(),
      new Bcrypt(new BCryptHelper())
    );

    const deleteUserUseCase    = new DeleteUserUseCase(userRepository);
    const deleteUserController = new DeleteUserController(deleteUserUseCase);

    return deleteUserController;
  }
}
