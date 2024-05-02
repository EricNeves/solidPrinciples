import { CreateUserDTO } from "./CreateUserDTO";

export interface ICreateUserUseCase {
  execute(user: CreateUserDTO): Promise<void>;
}
