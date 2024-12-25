import { makeQuestion } from "test/factories/make-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "./edit-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("Edit question use case", () => {
  beforeEach(async () => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to edit a question.", async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId("test-author"),
    });

    const { id } = await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: id.toString(),
      authorId: "test-author",
      title: "new test title",
      content: "new test content",
    });

    const success = result.isRight();

    expect(success).toBe(true);
    if (success) {
      expect(result.value.question).toEqual(
        inMemoryQuestionsRepository.items[0]
      );
    }
  });

  it("should not be able to edit a question from another user", async () => {
    const newQuestion = makeQuestion();

    const { id } = await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: id.toString(),
      authorId: "test-author",
      title: "new test title",
      content: "new test content",
    });

    const error = result.isLeft();

    expect(error).toBe(true);
    if (error) {
      expect(result.value).toBeInstanceOf(NotAllowedError);
    }
  });
});

