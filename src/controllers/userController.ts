import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const requiredFields = ["email", "password"];
      const missingFields = requiredFields.filter(
        (field) => !Object.keys(req.body).includes(field)
      );

      if (missingFields.length) {
        return res.status(400).json({
          message: `Missing fields: ${missingFields.join(", ")}`,
        });
      }

      const user = await UserService.createUser(req.body);
      return res.status(201).json({
        message: "User created successfully",
        result: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await UserService.getAllUsers();
    return res.status(200).json({
      result: users.map((user) => ({
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      })),
    });
  }

  async getUserById(req: Request, res: Response) {
    const user = await UserService.getUserById(Number(req.params.id));

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({
      result: user,
    });
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.updateUser(
        Number(req.params.id),
        req.body
      );

      return res.status(200).json({
        result: user,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.deleteUser(Number(req.params.id));

      return res.status(200).json({
        message: "User deleted successfully",
        result: user,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const token = await UserService.login(email, password);

      return res.status(200).json({ token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Error desconocido" });
    }
  }
}

export default new UserController();
