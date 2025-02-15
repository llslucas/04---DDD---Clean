import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit answer use case", () => {
  beforeEach(async () => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );

    sut = new EditAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerAttachmentsRepository
    );
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
      attachmentIds: ["1", "3"],
    });

    const success = result.isRight();

    expect(success).toBe(true);

    if (success) {
      expect(result.value.answer).toEqual(inMemoryAnswersRepository.items[0]);
      expect(result.value.answer.attachments.getItems()).toHaveLength(2);
      expect(result.value.answer.attachments.getItems()).toEqual([
        expect.objectContaining({ attachmentId: new UniqueEntityId("1") }),
        expect.objectContaining({ attachmentId: new UniqueEntityId("3") }),
      ]);
    }
  });

  it("should not be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer();

    const { id } = await inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      answerId: id.toString(),
      authorId: "test-author",
      content: "new test content",
      attachmentIds: [],
    });

    const error = result.isLeft();

    expect(error).toBe(true);
    if (error) {
      expect(result.value).toBeInstanceOf(NotAllowedError);
    }
  });
});

