import { IBcrypt } from "../IBcrypt";

import bcrypt from "bcrypt";

export class Bcrypt implements IBcrypt {
  constructor(private bcryptDep: typeof bcrypt) {}

  async hashPassword(password: string): Promise<string> {
    const hash = await this.bcryptDep.hash(password, 10);

    return hash;
  }

  async comparePassword(password: string, encrypted: string): Promise<boolean> {
    const matchPassword = await this.bcryptDep.compare(password, encrypted)
  
    if (!matchPassword) {
      return false;
    }

    return true;
  }
}
