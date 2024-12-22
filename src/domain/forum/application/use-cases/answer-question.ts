import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer;
}

export class AnswerQuestionUseCase {
  constructor(private repository: AnswersRepository) {}

  async execute(
    props: AnswerQuestionUseCaseRequest
  ): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityId(props.authorId),
      questionId: new UniqueEntityId(props.questionId),
      content: props.content,
    });

    await this.repository.create(answer);

    return { answer };
  }
}

