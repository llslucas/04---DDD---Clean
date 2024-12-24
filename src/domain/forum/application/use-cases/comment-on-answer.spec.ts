import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe("AnswerComment answer use case", () => {
  beforeEach(async () => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new CommentOnAnswerUseCase(inMemoryAnswerCommentsRepository);
  });

  it("should be able to create a new answer comment", async () => {
    const { answerComment } = await sut.execute({
      authorId: "author-test",
      answerId: "answer-test",
      content: "Testing answer comment creation.",
    });

    expect(answerComment.props).toEqual(
      expect.objectContaining({
        authorId: new UniqueEntityId("author-test"),
        answerId: new UniqueEntityId("answer-test"),
        content: "Testing answer comment creation.",
      })
    );
  });
});
