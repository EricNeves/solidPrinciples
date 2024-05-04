import { User } from "../../entities/User";

export interface IJwt {
  generate(data: Partial<User>|boolean): string;
  verify(token: string): User;
}