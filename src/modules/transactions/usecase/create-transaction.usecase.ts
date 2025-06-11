import {
  ITransactionRepository,
  TransactionRepository,
} from "../repositories/TransactionRepository";

type TCreateTransactionInput = Omit<
  ITransactionRepository,
  "id" | "userId" | "createdAt"
>;

export class CreateTransactionUseCase {
  constructor(private readonly TransactionRepository: TransactionRepository) {}

  async execute(data: TCreateTransactionInput, userId: string) {
    await this.TransactionRepository.create({ ...data, userId });
  }
}
