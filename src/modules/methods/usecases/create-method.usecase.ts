import {
  IMethodRepository,
  MethodRepository,
} from "../repositories/MethodRepository";

type TCreateMethodInput = Omit<
  IMethodRepository,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export class CreateMethodUseCase {
  constructor(private readonly MethodRepository: MethodRepository) {}

  async execute(data: TCreateMethodInput, userId: string) {
    await this.MethodRepository.create({ ...data, userId });
  }
}
