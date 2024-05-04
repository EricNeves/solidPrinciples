import { DeleteUserDTO } from "./DeleteUserDTO";

export interface IDeleteUserUseCase {
  execute(data: DeleteUserDTO): Promise<string>;
}
