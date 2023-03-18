import { User } from "@prisma/client";

export interface UserRepository {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<void>;
}
