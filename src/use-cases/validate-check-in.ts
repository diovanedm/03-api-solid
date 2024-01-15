import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { getDistanceBetweenCoordinate } from "@/utils/get-distance-between-coordinates";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./erros/resource-not-found";
import { MaxNumberOfCheckInsError } from "./erros/max-number-of-check-ins-error";
import { MaxDistanceError } from "./erros/max-distance-error";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./erros/late-check-in-validation-error";

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ checkInId }: ValidateCheckInUseCaseRequest) {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const limitTimeToValidateCheckIn = dayjs(checkIn.created_at).add(
      20,
      "minutes",
    );

    if (dayjs().isAfter(limitTimeToValidateCheckIn)) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();
    this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
