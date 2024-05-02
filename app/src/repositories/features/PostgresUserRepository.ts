import { IUserRepository } from "../IUserRepository";
import { PrismaClient } from "@prisma/client";
import { User } from "../../entities/User";

export class PostgresUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async save(user: User): Promise<void> {
    const { name, email, password } = user;

    await this.prisma.users.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
