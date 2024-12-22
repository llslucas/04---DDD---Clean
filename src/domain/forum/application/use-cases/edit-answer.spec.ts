import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit answer use case", () => {
  beforeEach(async () => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to edit a answer.", async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("test-author"),
    });

    const { id } = await inMemoryAnswersRepository.create(newAnswer);

    const { answer } = await sut.execute({
      answerId: id.toString(),
      authorId: "test-author",
      content: "new test content",
    });

    expect(inMemoryAnswersRepository.items[0].content).toEqual(
      "new test content"
    );

    expect(answer).toEqual(
      expect.objectContaining({
        content: "new test content",
      })
    );
  });

  it("should not be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("test-author-1"),
    });

    const { id } = await inMemoryAnswersRepository.create(newAnswer);

    await expect(
      sut.execute({
        answerId: id.toString(),
        authorId: "test-author-2",
        content: "new test content",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});

