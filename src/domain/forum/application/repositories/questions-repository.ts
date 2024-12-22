import { Question } from "../../enterprise/entities/question";

export interface QuestionsRepository {
  findById(questionId: string): Promise<Question | null>;
  findBySlug(slug: string): Promise<Question | null>;
  create(question: Question): Promise<Question>;
  delete(questionId: string): Promise<void>;
}

