import { IUserRepository } from "../../../repositories/IUserRepository";
import { IJwt } from "../../../utils/jwt/IJwt";
import { IAuthUserUseCase } from "./IAuthUserUseCase";

export class AuthUserUseCase implements IAuthUserUseCase {
  constructor(private userRepository: IUserRepository, private jwt: IJwt) {}

  async execute(data: AuthUserDTO): Promise<any> {
    const user = await this.userRepository.authenticate(data);

    if (!user) {
      throw new Error("Sorry, email/password is incorrect.");
    }

    return this.jwt.generate(user);
  }
}
