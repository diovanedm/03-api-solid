import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/erros/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true }); // Vai fazer a verifição do refresh token que está contido no cookie e não vai verificar o jwt que esta no cabeçalho Authorization

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  );

  const { role } = request.user;

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d",
      },
    },
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/", // Define quais rotas da aplicação o backend vai ter acesso ao  cookie
      secure: true, // Define que o cookie vai ser encriptado pelo HTTPs
      sameSite: true, // Só vai ser acessivel dentro do mesmo domínio/site
      httpOnly: true, // Só vai conseguir ser acessado pelo backend. Não vai ficar salvo no browser
    })
    .status(200)
    .send({ token });
}
