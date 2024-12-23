import { makeQuestion } from "test/factories/make-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe("Fetch recent questions case", () => {
  beforeEach(async () => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to fetch the recent questions.", async () => {
    inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 11, 10),
      })
    );

    inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 11, 22),
      })
    );

    inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 11, 5),
      })
    );

    const { questions } = await sut.execute({
      page: 1,
    });

    expect(questions).toHaveLength(3);

    expect(questions[0].createdAt).toEqual(new Date(2024, 11, 22));
  });

  it("should be able to fetch paginated recent questions.", async () => {
    for (let i = 0; i < 23; i++) {
      inMemoryQuestionsRepository.create(makeQuestion());
    }

    const { questions } = await sut.execute({
      page: 2,
    });

    expect(questions).toHaveLength(3);
  });
});

