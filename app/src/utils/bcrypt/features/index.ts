import bcrypt from "bcrypt";

export class BCryptHelper {
  private bcryptDep: typeof bcrypt;

  constructor() {
    this.bcryptDep = bcrypt;
  }

  async hashPassword(password: string): Promise<string> {
    const passwordEncrypted = await this.bcryptDep.hash(password, 10);
    return passwordEncrypted;
  }

  async comparePassword(password: string, encrypted: string): Promise<boolean> {
    const matchPassword = await this.bcryptDep.compare(password, encrypted)
  
    if (!matchPassword) {
      return false;
    }

    return true;
  }
}
