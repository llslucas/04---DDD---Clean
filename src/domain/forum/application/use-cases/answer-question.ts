import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";
import { Either, right } from "@/core/either";

interface AnswerQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

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

    return right({ answer });
  }
}

