export interface IBcrypt {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, encrypted: string): Promise<any>;
}