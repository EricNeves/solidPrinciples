import jsonwebtoken from "jsonwebtoken";
import { User } from "../../../entities/User";

export class JwtHelper {
  private jwt: typeof jsonwebtoken;
  private secret_key: string;

  constructor() {
    this.jwt = jsonwebtoken;
    this.secret_key = process.env.JWT_SECRET_KEY ?? '';
  }

  generate(data: boolean | Partial<User>): string {
    if (typeof data === 'boolean') {
      return '';
    }

    return this.jwt.sign(data, this.secret_key);
  }

  verify(token: string): any {
    try {
      return this.jwt.verify(token, this.secret_key)
    } catch (error: any) {
      return false;
    }
  }
}
