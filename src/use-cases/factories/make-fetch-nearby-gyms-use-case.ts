import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymsUseCase } from "../search-gyms";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

export function makeFechNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}
