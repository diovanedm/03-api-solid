import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricsUseCase } from "../get-metrics-user";

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckinsRepository();
  const useCase = new GetUserMetricsUseCase(checkInsRepository);

  return useCase;
}
