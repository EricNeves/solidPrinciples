import { IUserRepository } from "../../../repositories/IUserRepository";
import { IBcrypt } from "../../../utils/bcrypt/IBcrypt";
import { CreateUserDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private bcrypt: IBcrypt
  ) {}

  async execute(data: CreateUserDTO): Promise<void> {
    data.password = await this.bcrypt.hashPassword(data.password);

    await this.userRepository.save(data);
  }
}
