import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async findById(answerId: string) {
    return this.items.find((item) => item.id.toString() === answerId) ?? null;
  }

  async create(answer: Answer) {
    this.items.push(answer);

    return answer;
  }

  async delete(answerId: string) {
    const index = this.items.findIndex(
      (item) => item.id.toString() === answerId
    );

    this.items.splice(index, 1);
  }

  async save(answer: Answer): Promise<void> {
    const index = this.items.findIndex((item) => {
      return item.id === answer.id;
    });

    this.items[index] = answer;
  }
}

