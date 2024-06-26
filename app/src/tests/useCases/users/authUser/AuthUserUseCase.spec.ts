import { AuthUserUseCase } from "../../../../useCases/users/authUser/AuthUserUseCase";
import { IUserRepository } from "../../../../repositories/IUserRepository";
import { mock, MockProxy } from "jest-mock-extended";
import { IJwt } from "../../../../utils/jwt/IJwt";
import { User } from "../../../../entities/User";

process.env.JWT_SECRET_KEY = "admin";

describe("useCases/users", () => {
  let userRepository: MockProxy<IUserRepository>;
  let jwt: MockProxy<IJwt>;

  beforeEach(() => {
    userRepository = mock<IUserRepository>({
      authenticate: jest.fn(),
    });

    jwt = mock<IJwt>({
      generate: jest.fn(),
      verify: jest.fn(),
    });
  });

  it("should return a JWT token when authentication is successful", async () => {
    (userRepository.authenticate as jest.Mock).mockImplementation(
      (user: Partial<User>) => {
        return Promise.resolve(user);
      }
    );

    (jwt.generate as jest.Mock).mockResolvedValue("token");

    const authUserUseCase = new AuthUserUseCase(
      userRepository as IUserRepository,
      jwt
    );

    const auth = await authUserUseCase.execute({
      email: "john@test.com",
      password: "123",
    });

    expect(auth).toBeTruthy();
  });

  it("should throw an Error when authentication fails", async () => {
    try {
      (userRepository.authenticate as jest.Mock).mockResolvedValue(null);

      (jwt.generate as jest.Mock).mockResolvedValue("token");

      const auth = new AuthUserUseCase(
        userRepository as IUserRepository,
        jwt
      );

      await auth.execute({
        email: "john@test.com",
        password: "123",
      });
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
