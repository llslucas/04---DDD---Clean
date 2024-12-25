import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Answer question use case", () => {
  beforeEach(async () => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should be able to create a new answer", async () => {
    const result = await sut.execute({
      authorId: "author-test",
      questionId: "question-test",
      content: "Testing answer creation.",
    });

    const success = result.isRight();

    expect(success).toBe(true);
    if (success) {
      expect(result.value?.answer).toEqual(inMemoryAnswersRepository.items[0]);
    }
  });
});

