import { User } from "../../../entities/User";
import { IJwt } from "../IJwt";

export class Jwt {
  constructor(private jwtHelper: IJwt) {}

  generate(data: boolean | Partial<User>): string {
    if (typeof data === 'boolean') {
      return '';
    }  
    
    return this.jwtHelper.generate(data);
  }

  verify(token: string): Partial<User>|null {
    return this.jwtHelper.verify(token);
  }
}