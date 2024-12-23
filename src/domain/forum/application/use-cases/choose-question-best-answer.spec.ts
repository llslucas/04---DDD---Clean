import { makeQuestion } from "test/factories/make-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("ChooseQuestionBestAnswerUseCase question best answer use case", () => {
  beforeEach(async () => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository
    );
  });

  it("should be able to ChooseQuestionBestAnswerUseCase a question best answer.", async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId("test-author"),
    });

    const { id: questionId } = await inMemoryQuestionsRepository.create(
      newQuestion
    );

    const newAnswer = makeAnswer({
      questionId,
    });

    const { id: answerId } = await inMemoryAnswersRepository.create(newAnswer);

    const { question } = await sut.execute({
      answerId: answerId.toString(),
      authorId: "test-author",
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answerId);
    expect(question.bestAnswerId).toEqual(answerId);
  });

  it("should not be able to edit a question from another user", async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId("test-author-1"),
    });

    const { id: questionId } = await inMemoryQuestionsRepository.create(
      newQuestion
    );

    const newAnswer = makeAnswer({
      questionId,
    });

    const { id: answerId } = await inMemoryAnswersRepository.create(newAnswer);

    await expect(
      sut.execute({
        answerId: answerId.toString(),
        authorId: "test-author-2",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});

