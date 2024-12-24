import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeQuestionComment } from "test/factories/make-question-comment";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe("Delete question comment use case", () => {
  beforeEach(async () => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  it("should be able to delete a questionComment.", async () => {
    const newQuestionComment = makeQuestionComment({
      authorId: new UniqueEntityId("test-author"),
    });

    const questionComment = await inMemoryQuestionCommentsRepository.create(
      newQuestionComment
    );

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: "test-author",
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a question comment from another user", async () => {
    const newQuestionComment = makeQuestionComment({
      authorId: new UniqueEntityId("test-author-1"),
    });

    const questionComment = await inMemoryQuestionCommentsRepository.create(
      newQuestionComment
    );

    await expect(
      sut.execute({
        questionCommentId: questionComment.id.toString(),
        authorId: "test-author-2",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
