import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch nearby gyms Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    const userId = "user_01";
    gymsRepository.create({
      title: "Near Gym",
      latitude: -19.90271193909507,
      longitude: -44.00573944813533,
      description: null,
      phone: null,
    });

    gymsRepository.create({
      title: "Far Gym",
      latitude: -19.756676820190517,
      longitude: -44.07656285954579,
      description: null,
      phone: null,
    });

    const { gyms } = await sut.execute({
      userLatitude: -19.897802,
      userLongitude: -44.0103913,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
