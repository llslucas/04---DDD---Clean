import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment;
}

export class CommentOnQuestionUseCase {
  constructor(private repository: QuestionCommentsRepository) {}

  async execute(
    props: CommentOnQuestionUseCaseRequest
  ): Promise<CommentOnQuestionUseCaseResponse> {
    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(props.authorId),
      questionId: new UniqueEntityId(props.questionId),
      content: props.content,
    });

    await this.repository.create(questionComment);

    return { questionComment };
  }
}

