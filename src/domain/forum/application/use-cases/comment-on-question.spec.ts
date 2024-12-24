import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("QuestionComment question use case", () => {
  beforeEach(async () => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new CommentOnQuestionUseCase(inMemoryQuestionCommentsRepository);
  });

  it("should be able to create a new question comment", async () => {
    const { questionComment } = await sut.execute({
      authorId: "author-test",
      questionId: "question-test",
      content: "Testing question comment creation.",
    });

    expect(questionComment.props).toEqual(
      expect.objectContaining({
        authorId: new UniqueEntityId("author-test"),
        questionId: new UniqueEntityId("question-test"),
        content: "Testing question comment creation.",
      })
    );
  });
});

