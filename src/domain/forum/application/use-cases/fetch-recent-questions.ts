import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface FetchRecentQuestionsUseCaseRequest {
  page: number;
}

interface FetchRecentQuestionsUseCaseResponse {
  questions: Question[];
}

export class FetchRecentQuestionsUseCase {
  constructor(private repository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.repository.findManyRecent({ page });

    return {
      questions,
    };
  }
}

