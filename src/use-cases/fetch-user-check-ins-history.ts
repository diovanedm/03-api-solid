import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FechUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FechUserCheckInsHistoryUseCaseResponse {
  checkIn: CheckIn[];
}

export class FechUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId, page }: FechUserCheckInsHistoryUseCaseRequest) {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return {
      checkIns,
    };
  }
}
