import { QuestionsRepository } from "../repositories/questions-repository";

interface DeleteQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private repository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.repository.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error("Unauthorized");
    }

    await this.repository.delete(questionId);

    return {};
  }
}

