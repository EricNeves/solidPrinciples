import { User } from "../../../entities/User";

export interface IAuthUserUseCase {
  execute(data: AuthUserDTO): Promise<User>;
}