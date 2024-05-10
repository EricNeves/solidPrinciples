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

  async authenticate(user: Partial<User>): Promise<Partial<User> | boolean> {
    const userExists = await this.prisma.users.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!userExists) {
      return false;
    }

    const matchPassword = await this.bcrypt.comparePassword(
      user.password ?? '',
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

  async find(user: Partial<User>): Promise<Partial<User | null>> {
    const userFromDB = await this.prisma.users.findUnique({
      where: {
        email: user.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return userFromDB;
  }

  async update(user: Partial<User>): Promise<Partial<User>> {
    const userFromDB = await this.prisma.users.update({
      data: {
        name: user.name,
      },
      where: {
        email: user.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return userFromDB;
  }

  async remove(user: Partial<User>): Promise<Partial<User>> {
    const userFromDB = await this.prisma.users.delete({
      where: {
        email: user.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return userFromDB;
  }
}
