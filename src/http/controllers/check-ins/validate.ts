import { UserAlreadyExistsError } from "@/use-cases/erros/user-already-exists-error";
import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { makeValidateCheckInsUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInsParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInsParamsSchema.parse(request.params);

  const validateCheckInsUseCase = makeValidateCheckInsUseCase();

  await validateCheckInsUseCase.execute({
    checkInId,
  });

  return reply.status(204).send();
}
