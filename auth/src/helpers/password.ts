import bcrypt from "bcrypt";

export class Password {
  static async toHash(password: string) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  }

  static async compare(plainPassword: string, hashedPassword: string) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }

