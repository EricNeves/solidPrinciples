import { IUserRepository } from "../../../repositories/IUserRepository";
import { IDeleteUserUseCase } from "./IDeleteUserUseCase";
import { DeleteUserDTO } from "./DeleteUserDTO";

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: DeleteUserDTO): Promise<string> {
    await this.userRepository.remove(data);

    return "User deleted successfully.";
  }
}
