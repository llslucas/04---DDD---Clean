import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
  answerCommentId: string;
  authorId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private repository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.repository.findById(answerCommentId);

    if (!answerComment) {
      throw new Error("Answer comment not found");
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error("Unauthorized");
    }

    await this.repository.delete(answerCommentId);

    return {};
  }
}

