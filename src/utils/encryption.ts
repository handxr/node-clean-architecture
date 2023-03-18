import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
}
