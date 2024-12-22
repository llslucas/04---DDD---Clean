import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  public Answers: Answer[] = [];

  async create(answer: Answer) {
    this.Answers.push(answer);
  }
}

