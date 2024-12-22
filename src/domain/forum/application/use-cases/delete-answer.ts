import { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private repository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.repository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error("Unauthorized");
    }

    await this.repository.delete(answerId);

    return {};
  }
}

