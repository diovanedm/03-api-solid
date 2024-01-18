import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository);
  });

  it("should be able to fetch check-in history", async () => {
    const userId = "user_01";
    checkInsRepository.create({
      gym_id: "gym-01",
      user_id: userId,
    });

    checkInsRepository.create({
      gym_id: "gym-02",
      user_id: userId,
    });

    const { checkIns } = await sut.execute({
      userId,
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });

  it("should be able to fetch pagineted check-in history", async () => {
    const userId = "user_01";
    for (let gym = 1; gym <= 22; gym++) {
      checkInsRepository.create({
        gym_id: `gym-${gym}`,
        user_id: userId,
      });
    }

    const { checkIns: checkIns1 } = await sut.execute({
      userId,
      page: 1,
    });

    expect(checkIns1).toHaveLength(20);

    const { checkIns: checkIns2 } = await sut.execute({
      userId,
      page: 2,
    });

    expect(checkIns2).toHaveLength(2);
    expect(checkIns2).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
