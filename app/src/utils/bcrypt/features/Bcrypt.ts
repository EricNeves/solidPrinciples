import { IBcrypt } from "../IBcrypt";

import { BCryptHelper } from './index'

export class Bcrypt implements IBcrypt {
  constructor(private bcrypt: BCryptHelper) {}

  async hashPassword(password: string): Promise<string> {
    const hash = await this.bcrypt.encrypt(password)

    return hash;
  }

  async comparePassword(password: string, encrypted: string): Promise<boolean> {
    const matchPassword = await this.bcrypt.compare(password, encrypted)
  
    if (!matchPassword) {
      return false;
    }

    return true;
  }
}
