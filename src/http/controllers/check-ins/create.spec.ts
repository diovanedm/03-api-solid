import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import supertest from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prismaClient } from "@/lib/prisma";

describe("Create Check-in (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prismaClient.gym.create({
      data: {
        title: "Javascript Gym",
        latitude: -19.8978423,
        longitude: -44.0100051,
        description: "Some description",
        phone: "31971187697",
      },
    });
    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -19.8978423,
        longitude: -44.0100051,
      });

    expect(response.statusCode).toEqual(201);
  });
});
