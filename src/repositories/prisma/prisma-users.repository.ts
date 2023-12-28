import { prismaClient } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UserRepository } from "../users-repository";

export class PrismaUsersRepository implements UserRepository {
  async findByEmail(email: string) {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    return user;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prismaClient.user.create({ data });

    return user;
  }
}
