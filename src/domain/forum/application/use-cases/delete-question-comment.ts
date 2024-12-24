import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentUseCaseRequest {
  questionCommentId: string;
  authorId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private repository: QuestionCommentsRepository) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.repository.findById(questionCommentId);

    if (!questionComment) {
      throw new Error("Question comment not found");
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error("Unauthorized");
    }

    await this.repository.delete(questionCommentId);

    return {};
  }
}

