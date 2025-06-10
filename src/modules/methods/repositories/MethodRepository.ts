import { prisma } from "@shared/database/prisma";

export interface IMethodRepository {
  id: string;
  description: string;
  initialBalance: number;
  type: "BANK" | "CARD" | "SAVING";
  userId: string;
  createdAt: string;
}

type TMethodInput = Omit<IMethodRepository, "id" | "createdAt">;

export class MethodRepository {
  async list(userId: string) {
    const methods = await prisma.paymentMethod.findMany({ where: { userId } });

    return methods;
  }

  async create(data: TMethodInput) {
    await prisma.paymentMethod.create({ data });
  }

  async get(id: string, userId: string) {
    const method = await prisma.paymentMethod.findFirst({
      where: { id, userId },
    });

    return method;
  }

  async edit(id: string, data: TMethodInput) {
    const method = await prisma.paymentMethod.update({
      where: { id, userId: data.userId },
      data,
    });

    return method;
  }

  async delete(id: string, userId: string) {
    await prisma.paymentMethod.delete({ where: { id, userId } });
  }
}
