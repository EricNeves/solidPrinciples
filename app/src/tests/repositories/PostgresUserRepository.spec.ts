import { PostgresUserRepository } from "../../repositories/features/PostgresUserRepository";
import { MockProxy, mock } from "jest-mock-extended";
import { IBcrypt } from "../../utils/bcrypt/IBcrypt";
import { PrismaClient } from "@prisma/client";
import { User } from "../../entities/User";

describe("repositories/PostgresUserRepository", () => {
  let prismaClient: MockProxy<PrismaClient>;
  let bcrypt: MockProxy<IBcrypt>;

  const userData: User = {
    name: "John Joe",
    email: "john@test.com",
    password: "123",
  };

  beforeEach(() => {
    prismaClient = mock<PrismaClient>({
      users: {
        create: jest.fn(),
      },
    });

    bcrypt = mock<IBcrypt>({
      hashPassword: jest.fn(),
      comparePassword: jest.fn(),
    });
  });

  it("should save a new user", async () => {
    (prismaClient.users.create as jest.Mock).mockResolvedValue(userData);

    (bcrypt.hashPassword as jest.Mock).mockResolvedValue(
      Promise.resolve("encrypted")
    );

    const user = new PostgresUserRepository(prismaClient, bcrypt);

    await user.save(userData);

    await expect(user.save(userData)).resolves.toBeUndefined();

    expect(prismaClient.users.create).toHaveBeenCalledWith({
      data: userData,
    });
  });
});
