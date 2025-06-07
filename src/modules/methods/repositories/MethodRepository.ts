import { prisma } from "@shared/database/prisma";

export interface IMethodRepository {
  id: string;
  description: string;
  initialBalance: number;
  type: "BANK" | "CARD" | "SAVING";
  userId: string;
  createdAt: string;
  updatedAt: string;
}

type TCreateMethod = Omit<IMethodRepository, "id" | "createdAt" | "updatedAt">;

export class MethodRepository {
  async list(userId: string) {
    const methods = await prisma.paymentMethod.findMany({ where: { userId } });

    return methods;
  }

  async create(data: TCreateMethod) {
    await prisma.paymentMethod.create({ data });
  }
}
