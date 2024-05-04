import { IUserRepository } from "../IUserRepository";
import { IBcrypt } from "../../utils/bcrypt/IBcrypt";
import { PrismaClient } from "@prisma/client";
import { User } from "../../entities/User";

export class PostgresUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient, private bcrypt: IBcrypt) {}

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

  async authenticate(user: User): Promise<Partial<User> | boolean> {
    const userExists = await this.prisma.users.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!userExists) {
      return false;
    }

    const matchPassword = await this.bcrypt.comparePassword(
      user.password,
      userExists.password
    );

    if (!matchPassword) {
      return false;
    }

    return {
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
    };
  }
}
