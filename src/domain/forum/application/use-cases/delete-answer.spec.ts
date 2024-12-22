import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { DeleteAnswerUseCase } from "./delete-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("Delete answer use case", () => {
  beforeEach(async () => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to delete a answer.", async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("test-author"),
    });

    const answer = await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: "test-author",
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a answer from another user", async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("test-author-1"),
    });

    const answer = await inMemoryAnswersRepository.create(newAnswer);

    await expect(
      sut.execute({
        answerId: answer.id.toString(),
        authorId: "test-author-2",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});

