import { UniqueEntityId } from "@/core/entities/unique-entity-id";
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
      attachmentIds: ["1", "2"],
    });

    const success = result.isRight();

    expect(success).toBe(true);

    if (success) {
      const repositoryQuestion = inMemoryQuestionsRepository.items[0];

      expect(repositoryQuestion).toEqual(result.value.question);
      expect(repositoryQuestion.attachments).toHaveLength(2);
      expect(repositoryQuestion.attachments).toEqual([
        expect.objectContaining({ attachmentId: new UniqueEntityId("1") }),
        expect.objectContaining({ attachmentId: new UniqueEntityId("2") }),
      ]);
    }
  });
});

