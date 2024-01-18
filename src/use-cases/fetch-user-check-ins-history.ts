import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIn: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId, page }: FetchUserCheckInsHistoryUseCaseRequest) {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return {
      checkIns,
    };
  }
}
