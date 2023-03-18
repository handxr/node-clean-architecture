import PrismaUserRepository from "../repositories/prismaUserRepository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { hashPassword, comparePasswords } from "../utils/encryption";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/auth";
import { CreateUserDTO } from "domain/dto/CreateUserDTO";
import { UpdateUserDTO } from "domain/dto/UpdateUserDTO";

class UserService {
  async createUser(data: CreateUserDTO): Promise<User> {
    const userExists = await PrismaUserRepository.getUserByEmail(data.email);

    if (userExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    return PrismaUserRepository.createUser({
      ...data,
      password: hashedPassword,
    });
  }

  async getAllUsers(): Promise<User[]> {
    return PrismaUserRepository.getAllUsers();
  }

  async getUserById(id: number): Promise<User | null> {
    return PrismaUserRepository.getUserById(id);
  }

  async updateUser(id: number, data: UpdateUserDTO): Promise<User> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return PrismaUserRepository.updateUser(id, data);
  }

  async deleteUser(id: number): Promise<User> {
    return PrismaUserRepository.deleteUser(id);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await PrismaUserRepository.getUserByEmail(email);

    if (!user) {
      throw new Error("Email o contraseña incorrecta");
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Email o contraseña incorrecta");
    }

    const token = jwt.sign({ id: user.id }, jwtConfig.jwtSecret, {
      expiresIn: jwtConfig.expiresIn,
    });

    return token;
  }
}

export default new UserService();
