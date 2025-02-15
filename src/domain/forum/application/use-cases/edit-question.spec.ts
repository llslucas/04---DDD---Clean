import { makeQuestion } from "test/factories/make-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { EditQuestionUseCase } from "./edit-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: EditQuestionUseCase;

describe("Edit question use case", () => {
  beforeEach(async () => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );

    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionAttachmentsRepository
    );
  });

  it("should be able to edit a question.", async () => {
    const newQuestion = makeQuestion();
    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
      title: "new test title",
      content: "new test content",
      attachmentIds: ["1", "3"],
    });

    const success = result.isRight();

    expect(success).toBe(true);
    if (success) {
      expect(result.value.question).toEqual(
        inMemoryQuestionsRepository.items[0]
      );
      expect(result.value.question.attachments.getItems()).toHaveLength(2);
      expect(result.value.question.attachments.getItems()).toEqual([
        expect.objectContaining({ attachmentId: new UniqueEntityId("1") }),
        expect.objectContaining({ attachmentId: new UniqueEntityId("3") }),
      ]);
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
      attachmentIds: [],
    });

    const error = result.isLeft();

    expect(error).toBe(true);
    if (error) {
      expect(result.value).toBeInstanceOf(NotAllowedError);
    }
  });
});

