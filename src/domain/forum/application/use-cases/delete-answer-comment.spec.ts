import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeAnswerComment } from "test/factories/make-answer-comment";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe("Delete answer comment use case", () => {
  beforeEach(async () => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it("should be able to delete a answerComment.", async () => {
    const newAnswerComment = makeAnswerComment({
      authorId: new UniqueEntityId("test-author"),
    });

    const answerComment = await inMemoryAnswerCommentsRepository.create(
      newAnswerComment
    );

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: "test-author",
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a answer comment from another user", async () => {
    const newAnswerComment = makeAnswerComment({
      authorId: new UniqueEntityId("test-author-1"),
    });

    const answerComment = await inMemoryAnswerCommentsRepository.create(
      newAnswerComment
    );

    await expect(
      sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: "test-author-2",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
