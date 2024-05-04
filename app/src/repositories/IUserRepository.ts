import { User } from "../entities/User";

export interface IUserRepository {
  save(user: User): Promise<void>;
  authenticate(user: Partial<User>): Promise<Partial<User> | boolean>;
  find(user: Partial<User>): Promise<Partial<User | null>>;
  update(user: Partial<User>): Promise<Partial<User>>;
  remove(user: Partial<User>): Promise<Partial<User>>;
}
