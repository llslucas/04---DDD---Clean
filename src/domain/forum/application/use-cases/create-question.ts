import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
  slug?: Slug;
}

interface CreateQuestionUseCaseResponse {
  question: Question;
}

export class CreateQuestionUseCase {
  constructor(private repository: QuestionsRepository) {}

  async execute(
    props: CreateQuestionUseCaseRequest
  ): Promise<CreateQuestionUseCaseResponse> {
    const newQuestion = Question.create({
      authorId: new UniqueEntityId(props.authorId),
      title: props.title,
      content: props.title,
      slug: props.slug,
    });

    const question = await this.repository.create(newQuestion);

    return { question };
  }
}

