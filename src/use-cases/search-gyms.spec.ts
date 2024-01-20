import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    const userId = "user_01";
    gymsRepository.create({
      title: "Javascript Gym",
      latitude: -19.8978423,
      longitude: -44.0100051,
      description: null,
      phone: null,
    });

    gymsRepository.create({
      title: "Typescript Gym",
      latitude: -19.8978423,
      longitude: -44.0100051,
      description: null,
      phone: null,
    });

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript Gym" }),
    ]);
  });

  it("should be able to fetch pagineted gyms search", async () => {
    const userId = "user_01";
    for (let i = 1; i <= 22; i++) {
      gymsRepository.create({
        title: `Javascript Gym ${i}`,
        latitude: -19.8978423,
        longitude: -44.0100051,
        description: null,
        phone: null,
      });
    }

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript Gym 21" }),
      expect.objectContaining({ title: "Javascript Gym 22" }),
    ]);
  });
});
