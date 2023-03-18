import UserService from "../../services/userService";
import PrismaUserRepository from "../../repositories/prismaUserRepository";
import { hashPassword } from "../../utils/encryption";

jest.mock("../../repositories/prismaUserRepository");
jest.mock("../../utils/encryption");

describe("UserService", () => {
  describe("createUser", () => {
    const mockData = {
      email: "test@example.com",
      name: "Test User",
      password: "testpassword",
    };
    const hashedPassword = "hashedpassword";

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should create a new user", async () => {
      (PrismaUserRepository.getUserByEmail as jest.Mock).mockResolvedValue(
        null
      );
      (hashPassword as jest.Mock).mockResolvedValue(hashedPassword);
      (PrismaUserRepository.createUser as jest.Mock).mockResolvedValue({
        ...mockData,
        id: 1,
        password: hashedPassword,
      });

      const result = await UserService.createUser(mockData);

      expect(PrismaUserRepository.getUserByEmail).toHaveBeenCalledWith(
        mockData.email
      );
      expect(hashPassword).toHaveBeenCalledWith(mockData.password);
      expect(PrismaUserRepository.createUser).toHaveBeenCalledWith({
        ...mockData,
        password: hashedPassword,
      });
      expect(result).toEqual({
        ...mockData,
        id: 1,
        password: hashedPassword,
      });
    });

    it("should throw an error if the user already exists", async () => {
      (PrismaUserRepository.getUserByEmail as jest.Mock).mockResolvedValue({
        ...mockData,
        id: 1,
        password: hashedPassword,
      });

      await expect(UserService.createUser(mockData)).rejects.toThrow(
        "User already exists"
      );
    });
  });

  describe("getAllUsers", () => {
    const mockUsers = [
      {
        id: 1,
        email: "test1@example.com",
        name: "Test User 1",
        password: "hashedpassword1",
      },
      {
        id: 2,
        email: "test2@example.com",
        name: "Test User 2",
        password: "hashedpassword2",
      },
    ];

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return a list of all users", async () => {
      (PrismaUserRepository.getAllUsers as jest.Mock).mockResolvedValue(
        mockUsers
      );

      const result = await UserService.getAllUsers();

      expect(PrismaUserRepository.getAllUsers).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe("getUserById", () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
      name: "Test User",
      password: "hashedpassword",
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return a user by id", async () => {
      (PrismaUserRepository.getUserById as jest.Mock).mockResolvedValue(
        mockUser
      );

      const result = await UserService.getUserById(1);

      expect(PrismaUserRepository.getUserById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe("updateUser", () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
      name: "Test User",
      password: "hashedpassword",
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should update a user and return the updated user", async () => {
      (PrismaUserRepository.updateUser as jest.Mock).mockResolvedValue(
        mockUser
      );

      const result = await UserService.updateUser(1, {
        name: "Updated Test User",
      });

      expect(PrismaUserRepository.updateUser).toHaveBeenCalledWith(1, {
        name: "Updated Test User",
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe("deleteUser", () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
      name: "Test User",
      password: "hashedpassword",
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should delete a user and return the deleted user", async () => {
      (PrismaUserRepository.deleteUser as jest.Mock).mockResolvedValue(
        mockUser
      );

      const result = await UserService.deleteUser(1);

      expect(PrismaUserRepository.deleteUser).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });
  });
});
