import { hashPassword, comparePasswords } from "../../utils/encryption";

describe("hashPassword", () => {
  it("should generate a different hash for the same password", async () => {
    const password = "myPassword123";
    const hashedPassword1 = await hashPassword(password);
    const hashedPassword2 = await hashPassword(password);

    expect(hashedPassword1).not.toBe(hashedPassword2);
  });

  it("should generate a hash with a specific length", async () => {
    const password = "myPassword123";
    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).toHaveLength(60);
  });
});

describe("comparePasswords", () => {
  it("should return true if the passwords match", async () => {
    const password = "myPassword123";
    const hashedPassword = await hashPassword(password);

    const result = await comparePasswords(password, hashedPassword);
    expect(result).toBe(true);
  });

  it("should return false if the passwords do not match", async () => {
    const password1 = "myPassword123";
    const password2 = "myPassword456";
    const hashedPassword = await hashPassword(password1);

    const result = await comparePasswords(password2, hashedPassword);
    expect(result).toBe(false);
  });
});
