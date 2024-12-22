import { makeQuestion } from "test/factories/make-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("Delete question use case", () => {
  beforeEach(async () => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to delete a question.", async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId("test-author"),
    });

    const question = await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: question.id.toString(),
      authorId: "test-author",
    });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a question from another user", async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId("test-author-1"),
    });

    const question = await inMemoryQuestionsRepository.create(newQuestion);

    await expect(
      sut.execute({
        questionId: question.id.toString(),
        authorId: "test-author-2",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});

