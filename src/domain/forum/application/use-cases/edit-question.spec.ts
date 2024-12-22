import { makeQuestion } from "test/factories/make-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "./edit-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

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

    const { question } = await sut.execute({
      questionId: id.toString(),
      authorId: "test-author",
      title: "new test title",
      content: "new test content",
    });

    expect(inMemoryQuestionsRepository.items[0].title).toEqual(
      "new test title"
    );
    expect(inMemoryQuestionsRepository.items[0].content).toEqual(
      "new test content"
    );

    expect(question).toEqual(
      expect.objectContaining({
        title: "new test title",
        content: "new test content",
      })
    );
  });

  it("should not be able to edit a question from another user", async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId("test-author-1"),
    });

    const { id } = await inMemoryQuestionsRepository.create(newQuestion);

    await expect(
      sut.execute({
        questionId: id.toString(),
        authorId: "test-author-2",
        title: "new test title",
        content: "new test content",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});

