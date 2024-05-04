import { User } from "../../../entities/User";
import { FetchUserDTO } from "./FetchUserDTO";

export interface IFetchUserUseCase {
  execute(data: FetchUserDTO): Promise<Partial<User>>;
}