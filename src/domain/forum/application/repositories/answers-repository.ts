import { Answer } from "../../enterprise/entities/answer";

export interface AnswersRepository {
  findById(answerId: string): Promise<Answer | null>;
  create(answer: Answer): Promise<Answer>;
  delete(answerId: string): Promise<void>;
  save(answer: Answer): Promise<void>;
}

