import { randomUUID } from "node:crypto";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public user: User[] = [];

  async findById(id: string) {
    const user = this.user.find((user) => user.id === id) || null;
    return user;
  }

  async findByEmail(email: string) {
    const user = this.user.find((user) => user.email === email) || null;
    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const newUser: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.user.push(newUser);

    return newUser;
  }
}
