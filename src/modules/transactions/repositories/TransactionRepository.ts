import { prisma } from "@shared/database/prisma";

export interface ITransactionRepository {
  id: string;
  date: string;
  description: string;
  amount: number;
  userId: string;
  paymentMethodId: string;
  categoryId: string;
  createdAt: string;
}

type TTransactionInput = Omit<ITransactionRepository, "id" | "createdAt">;

export class TransactionRepository {
  async list(userId: string) {
    const transactions = prisma.transaction.findMany({
      select: {
        id: true,
        description: true,
        amount: true,
        category: true,
        paymentMethod: true,
        createdAt: true,
      },
      where: { userId },
    });

    return transactions;
  }

  async create(data: TTransactionInput) {
    await prisma.transaction.create({
      data,
    });
  }
}
