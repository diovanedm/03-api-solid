import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import supertest from "supertest";

describe("Register (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "Diovane",
      email: "diovane.maia@gmail.com",
      password: "123456",
    });

    expect(response.status).toEqual(201);
  });
});
