import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";
import { GetUserMetricsUseCase } from "./get-metrics-user";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get Metrics Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    const userId = "user_01";
    checkInsRepository.create({
      gym_id: "gym-01",
      user_id: userId,
    });

    checkInsRepository.create({
      gym_id: "gym-02",
      user_id: userId,
    });

    const { checkInsCount } = await sut.execute({
      userId,
    });

    expect(checkInsCount).toEqual(2);
  });
});
