import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create question use case", () => {
  beforeEach(async () => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to create a new question", async () => {
    const result = await sut.execute({
      authorId: "1",
      title: "Testing Question",
      content: "Question content",
    });

    const success = result.isRight();

    expect(success).toBe(true);

    if (success) {
      expect(result.value.question).toEqual(
        inMemoryQuestionsRepository.items[0]
      );
    }
  });
});

