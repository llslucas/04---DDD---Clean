import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
  constructor(private repository: AnswerCommentsRepository) {}

  async execute(
    props: CommentOnAnswerUseCaseRequest
  ): Promise<CommentOnAnswerUseCaseResponse> {
    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(props.authorId),
      answerId: new UniqueEntityId(props.answerId),
      content: props.content,
    });

    await this.repository.create(answerComment);

    return { answerComment };
  }
}

