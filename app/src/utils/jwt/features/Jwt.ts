import { User } from "../../../entities/User";
import { IJwt } from "../IJwt";
import { JwtHelper } from './index'

export class Jwt implements IJwt {
  constructor(private jwtHelper: JwtHelper) {}

  generate(data: boolean | Partial<User>): string {
    if (typeof data === 'boolean') {
      return '';
    }  

    return this.jwtHelper.generate(data);
  }

  verify(token: string): User {
    return this.jwtHelper.verify(token);
  }
}