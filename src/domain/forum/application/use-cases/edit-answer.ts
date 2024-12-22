import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface EditAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
  content: string;
}

interface EditAnswerUseCaseResponse {
  answer: Answer;
}

export class EditAnswerUseCase {
  constructor(private repository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.repository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error("Unauthorized");
    }

    answer.content = content;

    await this.repository.save(answer);

    return { answer };
  }
}

