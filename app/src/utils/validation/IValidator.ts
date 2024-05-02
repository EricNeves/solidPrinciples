import { User } from "../../entities/User";

export interface IValidator {
  validate(user: User): boolean;
}
