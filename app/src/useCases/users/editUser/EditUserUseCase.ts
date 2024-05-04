import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IEditUserUseCase } from "./IEditUserUseCase";

export class EditUserUseCase implements IEditUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: EditUserDTO): Promise<Partial<User>> {
    const user = await this.userRepository.update(data);

    return user;
  }
}
