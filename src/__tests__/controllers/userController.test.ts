import UserController from "../../controllers/userController";
import UserService from "../../services/userService";
import supertest from "supertest";
import express from "express";

const app = express();
app.use(express.json());
app.post("/test", UserController.createUser);
app.get("/test", UserController.getAllUsers);
app.get("/test/:id", UserController.getUserById);
app.put("/test/:id", UserController.updateUser);
app.delete("/test/:id", UserController.deleteUser);
app.post("/test/login", UserController.login);

jest.mock("../../services/userService");

const request = supertest(app);

describe("UserController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a user and return 201 status with user data", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
      };
      (UserService.createUser as jest.Mock).mockResolvedValue(mockUser);

      const res = await request
        .post("/test")
        .send({ email: "test@example.com", password: "password" });

      expect(UserService.createUser).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        message: "User created successfully",
        result: mockUser,
      });
    });
    it("should return a 400 status and error message if a required field is missing", async () => {
      const incompleteUserData = {
        email: "test@example.com",
      };

      const res = await request.post("/test").send(incompleteUserData);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        message: expect.stringContaining("Missing Fields:"),
      });
    });
  });
  describe("getAllUsers", () => {
    it("should return all users with status 200", async () => {
      const mockUsers = [
        {
          id: 1,
          email: "test1@example.com",
          name: "Test User 1",
        },
        {
          id: 2,
          email: "test2@example.com",
          name: "Test User 2",
        },
      ];
      (UserService.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

      const res = await request.get("/test");

      expect(UserService.getAllUsers).toHaveBeenCalled();
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        result: mockUsers,
      });
    });
  });

  describe("getUserById", () => {
    it("should return user with the given id and status 200", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
      };
      (UserService.getUserById as jest.Mock).mockResolvedValue(mockUser);

      const res = await request.get("/test/1");

      expect(UserService.getUserById).toHaveBeenCalledWith(1);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        result: mockUser,
      });
    });
  });

  describe("updateUser", () => {
    it("should update user with the given id and return updated user with status 200", async () => {
      const mockUser = {
        id: 1,
        email: "updated@example.com",
        name: "Updated User",
      };
      (UserService.updateUser as jest.Mock).mockResolvedValue(mockUser);

      const res = await request
        .put("/test/1")
        .send({ email: "updated@example.com", name: "Updated User" });

      expect(UserService.updateUser).toHaveBeenCalledWith(1, {
        email: "updated@example.com",
        name: "Updated User",
      });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        result: mockUser,
      });
    });
  });

  describe("deleteUser", () => {
    it("should delete user with the given id and return deleted user with status 200", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
      };
      (UserService.deleteUser as jest.Mock).mockResolvedValue(mockUser);

      const res = await request.delete("/test/1");

      expect(UserService.deleteUser).toHaveBeenCalledWith(1);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        message: "User deleted successfully",
        result: mockUser,
      });
    });
  });
});
