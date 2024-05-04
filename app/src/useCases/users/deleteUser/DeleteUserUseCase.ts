import { IUserRepository } from "../../../repositories/IUserRepository";
import { IDeleteUserUseCase } from "./IDeleteUserUseCase";
import { DeleteUserDTO } from "./DeleteUserDTO";

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: DeleteUserDTO): Promise<string> {
    const user = await this.userRepository.remove(data);

    if (!user) {
      throw new Error("Sorry, something went wrong.");
    }

    return "User deleted successfully.";
  }
}
