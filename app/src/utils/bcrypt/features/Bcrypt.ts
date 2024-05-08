import { IBcrypt } from "../IBcrypt";

export class Bcrypt {
  constructor(private bcrypt: IBcrypt) {}

  async hashPassword(password: string): Promise<string> {
    const hash = await this.bcrypt.hashPassword(password)

    return hash;
  }

  async comparePassword(password: string, encrypted: string): Promise<boolean> {
    const matchPassword = await this.bcrypt.comparePassword(password, encrypted)
  
    if (!matchPassword) {
      return false;
    }

    return true;
  }
}
