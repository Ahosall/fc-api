import { NotFoundError } from "@shared/errors/NotFoundError";
import {
  MethodRepository,
  IMethodRepository,
} from "../repositories/MethodRepository";

type TEditMethodInput = Omit<IMethodRepository, "id" | "userId" | "createdAt">;

export class EditMethodUseCase {
  constructor(private readonly MethodRepository: MethodRepository) {}

  async execute(id: string, data: TEditMethodInput, userId: string) {
    const found = await this.MethodRepository.get(id, userId);
    if (!found) {
      throw new NotFoundError("Forma de pagamento não existe");
    }

    const methodUpdated = await this.MethodRepository.edit(id, {
      ...data,
      userId,
    });

    return methodUpdated;
  }
}
