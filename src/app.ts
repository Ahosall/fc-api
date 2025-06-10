import Fastify from "fastify";

import corsPlugin from "@shared/plugins/cors";
import jwtPlugin from "@shared/plugins/jwt";
import authenticatePlugin from "@shared/plugins/authenticate";

import { authRoutes } from "@modules/auth/routes";
import { categoriesRoutes } from "@modules/categories/routes";
import { methodsRoutes } from "@modules/methods/route";
import { transactionsRoutes } from "@modules/transactions/route";

export const app = Fastify({ logger: true });

// Plugins
app.register(corsPlugin);
app.register(jwtPlugin);
app.register(authenticatePlugin);

// Routes
app.register(authRoutes, { prefix: "/auth" });
app.register(categoriesRoutes, { prefix: "/categories" });
app.register(methodsRoutes, { prefix: "/methods" });
app.register(transactionsRoutes, { prefix: "/transactions" });
