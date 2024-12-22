import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async findById(questionId: string) {
    return this.items.find((item) => item.id.toString() === questionId) ?? null;
  }

  async findBySlug(slug: string): Promise<Question | null> {
    return this.items.find((item) => item.slug.value === slug) ?? null;
  }

  async create(question: Question) {
    this.items.push(question);

    return question;
  }

  async delete(questionId: string) {
    const index = this.items.findIndex((item) => {
      return item.id.toString() === questionId;
    });

    this.items.splice(index, 1);
  }

  async save(question: Question): Promise<void> {
    const index = this.items.findIndex((item) => {
      return item.id === question.id;
    });

    this.items[index] = question;
  }
}

