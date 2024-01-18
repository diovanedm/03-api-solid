import { prismaClient as prisma } from "@/lib/prisma";
import { CheckInsRepository } from "../check-ins-repository";
import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";

export class PrismaCheckinsRepository implements CheckInsRepository {
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: { id },
    });

    return checkIn;
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkIns = prisma.checkIn.findFirst({
      where: {
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkIns;
  }
  async findManyByUserId(userid: string, page: number) {
    const checkIns = prisma.checkIn.findMany({
      where: { user_id: userid },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }
  async countByUserId(userId: string) {
    const count = prisma.checkIn.count({
      where: { user_id: userId },
    });

    return count;
  }
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({ data });

    return checkIn;
  }
  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data: data,
    });

    return data;
  }
}
