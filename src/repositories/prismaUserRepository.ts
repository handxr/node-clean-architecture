import { PrismaClient, User } from "@prisma/client";

class PrismaUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(data: {
    email: string;
    name: string;
    password: string;
  }): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateUser(
    id: number,
    data: { email?: string; name?: string; password?: string }
  ): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}

export default new PrismaUserRepository();
