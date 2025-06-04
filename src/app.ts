import Fastify from "fastify";

import corsPlugin from "@shared/plugins/cors";
import jwtPlugin from "@shared/plugins/jwt";
import authenticatePlugin from "@shared/plugins/authenticate";

import { authRoutes } from "@modules/auth/routes";

export const app = Fastify({ logger: true });

// Plugins
app.register(corsPlugin);
app.register(jwtPlugin);
app.register(authenticatePlugin);

// Routes
app.register(authRoutes, { prefix: "/auth" });
