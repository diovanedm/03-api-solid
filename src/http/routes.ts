import { FastifyInstance } from "fastify";
import { authenticate } from "./controllers/authenticate";
import { profile } from "./controllers/profile";
import { register } from "./controllers/register";
import { verifyJWT } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  // Authenticate
  app.addHook("onRequest", async (request, reply) => {
    await verifyJWT(request, reply);
  });

  app.get("/me", profile);
}
