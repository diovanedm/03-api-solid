import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInUseCase } from "../validate-check-in";
import { CheckInUseCase } from "../check-in";

export function makeValidateCheckInsUseCase() {
  const checkInsRepository = new PrismaCheckinsRepository();
  const useCase = new ValidateCheckInUseCase(checkInsRepository);

  return useCase;
}
