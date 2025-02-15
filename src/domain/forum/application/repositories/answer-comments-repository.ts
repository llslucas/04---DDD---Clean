import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentsRepository {
  findById(answerCommentId: string): Promise<AnswerComment | null>;
  findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams
  ): Promise<AnswerComment[]>;
  create(answerComment: AnswerComment): Promise<AnswerComment>;
  delete(answerCommentId: string): Promise<void>;
}

