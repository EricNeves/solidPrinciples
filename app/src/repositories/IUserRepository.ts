import { User } from "../entities/User";

export interface IUserRepository {
  save(user: User): Promise<void>;
  authenticate(user: Partial<User>): Promise<Partial<User>|boolean>;
}
