import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Authenticate (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to refresh token", async () => {
    await request(app.server).post("/users").send({
      name: "Diovane",
      email: "diovane.maia@gmail.com",
      password: "123456",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "diovane.maia@gmail.com",
      password: "123456",
    });

    const cookies = response.get("Set-Cookie");

    const refreshTokenResponse = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(refreshTokenResponse.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
