import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import supertest from "supertest";

describe("Profile (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/users").send({
      name: "Diovane",
      email: "diovane.maia@gmail.com",
      password: "123456",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "diovane.maia@gmail.com",
      password: "123456",
    });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(authResponse.status).toEqual(200);
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        email: "diovane.maia@gmail.com",
      }),
    );
  });
});
