import { User } from "../../../entities/User";

export interface IEditUserUseCase {
  execute(data: EditUserDTO): Promise<Partial<User>>;
}