import { UniqueEntityId } from "@/core/entities/unique-entity-id";
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
    const { answer } = await sut.execute({
      authorId: "author-test",
      questionId: "question-test",
      content: "Testing answer creation.",
    });

    expect(answer.props).toEqual(
      expect.objectContaining({
        authorId: new UniqueEntityId("author-test"),
        questionId: new UniqueEntityId("question-test"),
        content: "Testing answer creation.",
      })
    );
  });
});

