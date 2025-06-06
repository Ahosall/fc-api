import { prisma } from "@shared/database/prisma";

export class MethodRepository {
  async list(userId: string) {
    const methods = await prisma.paymentMethod.findMany({ where: { userId } });

    return methods;
  }
}
