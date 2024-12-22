import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface EditQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
  title: string;
  content: string;
}

interface EditQuestionUseCaseResponse {
  question: Question;
}

export class EditQuestionUseCase {
  constructor(private repository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.repository.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error("Unauthorized");
    }

    question.title = title;
    question.content = content;

    await this.repository.save(question);

    return { question };
  }
}

