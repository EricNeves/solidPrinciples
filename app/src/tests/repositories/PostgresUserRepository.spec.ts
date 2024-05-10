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
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
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

    const userRepository = new PostgresUserRepository(prismaClient, bcrypt);

    await userRepository.save(userData);

    await expect(userRepository.save(userData)).resolves.toBeUndefined();

    expect(prismaClient.users.create).toHaveBeenCalledWith({
      data: userData,
    });
  });

  it("should authenticate user", async () => {
    (prismaClient.users.findUnique as jest.Mock).mockReturnValue({
      id: 1,
      ...userData,
    });

    (bcrypt.comparePassword as jest.Mock).mockReturnValue(true);

    const userRepository = new PostgresUserRepository(prismaClient, bcrypt);

    const user = await userRepository.authenticate({
      email: "john@test.com",
      password: "123",
    });

    expect(user).toHaveProperty("id", 1);
  });

  it("should return false if user does not exists", async () => {
    (prismaClient.users.findUnique as jest.Mock).mockReturnValue(null);

    (bcrypt.comparePassword as jest.Mock).mockReturnValue(true);

    const userRepository = new PostgresUserRepository(prismaClient, bcrypt);

    const user = await userRepository.authenticate({
      email: "john@test.com",
      password: "123",
    });

    expect(user).toBeFalsy();
  });

  it("should return false if password does not match", async () => {
    (prismaClient.users.findUnique as jest.Mock).mockReturnValue(userData);

    (bcrypt.comparePassword as jest.Mock).mockReturnValue(false);

    const userRepository = new PostgresUserRepository(prismaClient, bcrypt);

    const user = await userRepository.authenticate({
      email: "john@test.com",
      password: "123",
    });

    expect(user).toBeFalsy();
  });

  it("should return false if password is empty", async () => {    
    (prismaClient.users.findUnique as jest.Mock).mockReturnValue({ id: 1, ...userData });

    (bcrypt.comparePassword as jest.Mock).mockReturnValue(false);

    const userRepository = new PostgresUserRepository(prismaClient, bcrypt);

    const user = await userRepository.authenticate({
      email: "john@test.com"
    });

    expect(user).toBeFalsy();
  });

  it("should return data if user exists", async () => {
    (prismaClient.users.findUnique as jest.Mock).mockReturnValue(userData);

    const userRepository = new PostgresUserRepository(prismaClient, bcrypt);

    const user = await userRepository.find({ email: "john@test.com" });

    expect(user).toHaveProperty("email", "john@test.com");
  });

  it("should return data if the user was updated", async () => {
    (prismaClient.users.update as jest.Mock).mockReturnValue(userData);

    const userRepository = new PostgresUserRepository(prismaClient, bcrypt);

    const user = await userRepository.update({ email: "john@test.com" });

    expect(user).toHaveProperty("email", "john@test.com");
  });

  it("should return data if the user was deleted", async () => {
    (prismaClient.users.delete as jest.Mock).mockReturnValue(userData);

    const userRepository = new PostgresUserRepository(prismaClient, bcrypt);

    const user = await userRepository.remove({ email: "john@test.com" });

    expect(user).toHaveProperty("email", "john@test.com");
  });
});
