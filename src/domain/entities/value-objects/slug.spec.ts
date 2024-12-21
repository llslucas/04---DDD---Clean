import { Slug } from "./slug";

it("should create a slug from a string", () => {
  const slug = Slug.createFromText("Hello World");
  expect(slug.value).toBe("hello-world");
});

