import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";

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

    const result = await sut.execute({
      answerId: id.toString(),
      authorId: "test-author",
      content: "new test content",
    });

    const success = result.isRight();

    expect(success).toBe(true);

    if (success) {
      expect(inMemoryAnswersRepository.items[0]).toEqual(result.value.answer);
    }
  });

  it("should not be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer();

    const { id } = await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      answerId: id.toString(),
      authorId: "test-author",
      content: "new test content",
    });

    const error = result.isLeft();

    expect(error).toBe(true);
    if (error) {
      expect(result.value).toBeInstanceOf(NotAllowedError);
    }
  });
});

