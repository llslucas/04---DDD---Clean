import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";
import { answerQuestionUseCase } from "./answer-question";

const fakeAnswerRepository: AnswersRepository = {
  create: async (answer: Answer) => {},
};

it("should be able to create a new answer", async () => {
  const sut = new answerQuestionUseCase(fakeAnswerRepository);

  const answer = await sut.execute({
    authorId: "author-test",
    questionId: "question-test",
    content: "Testing answer creation.",
  });

  expect(answer.props).toEqual(
    expect.objectContaining({
      authorId: new UniqueEntityId("author-test"),
      questionId: new UniqueEntityId("question-test"),
      content: "Testing answer creation.",
    })
  );
});

