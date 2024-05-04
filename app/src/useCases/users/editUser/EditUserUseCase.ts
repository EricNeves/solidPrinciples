import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IEditUserUseCase } from "./IEditUserUseCase";

export class EditUserUseCase implements IEditUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: EditUserDTO): Promise<Partial<User>> {
    const user = await this.userRepository.update(data);

    if (!user) {
      throw new Error("Sorry, something went wrong.");
    }

    return user;
  }
}
