import { describe } from "node:test";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { compare, hash } from "bcryptjs";
import { beforeEach, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./erros/invalid-credentials-error";
import { UserAlreadyExistsError } from "./erros/user-already-exists-error";
import { RegisterUseCase } from "./register";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    const email = "johndoe@gmail.com";
    const password = "123456";

    usersRepository.create({
      name: "John Doe",
      email,
      password_hash: await hash(password, 6),
    });

    const { user } = await sut.execute({ email, password });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({ email: "invalid.email@test.com", password: "123456" }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const email = "johndoe@gmail.com";

    usersRepository.create({
      name: "John Doe",
      email,
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({ email, password: "999999" }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
