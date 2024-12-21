import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseProps {
  authorId: string;
  questionId: string;
  content: string;
}

export class answerQuestionUseCase {
  constructor(private repository: AnswersRepository) {}

  async execute(props: AnswerQuestionUseCaseProps) {
    const answer = Answer.create({
      authorId: new UniqueEntityId(props.authorId),
      questionId: new UniqueEntityId(props.questionId),
      content: props.content,
    });

    await this.repository.create(answer);

    return answer;
  }
}

