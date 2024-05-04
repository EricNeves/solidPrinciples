import { IUserRepository } from "../../../repositories/IUserRepository";
import { IFetchUserUseCase } from "./IFetchUserUseCase";
import { FetchUserDTO } from "./FetchUserDTO";
import { User } from "../../../entities/User";

export class FetchUserUseCase implements IFetchUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: FetchUserDTO): Promise<Partial<User>> {
    const user = await this.userRepository.find({ email: data.email });

    if (!user) {
      throw new Error("Sorry, user not found.");
    }

    return user;
  }
}
