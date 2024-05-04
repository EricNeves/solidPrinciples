import { User } from "../entities/User";

declare global {
  namespace Express {
    interface Request {
      customer: Partial<User>|null
    }
  }
}