import { PaginationParams } from "@/core/repositories/pagination-params";
import { Question } from "../../enterprise/entities/question";

export interface QuestionsRepository {
  findById(questionId: string): Promise<Question | null>;
  findBySlug(slug: string): Promise<Question | null>;
  findManyRecent(params: PaginationParams): Promise<Question[]>;
  create(question: Question): Promise<Question>;
  delete(questionId: string): Promise<void>;
  save(question: Question): Promise<void>;
}

