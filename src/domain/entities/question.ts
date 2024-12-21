import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Slug } from "./value-objects/slug";
import { Optional } from "@/core/types/optional";
import dayjs from "dayjs";

interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  static create(
    props: Optional<QuestionProps, "createdAt" | "slug">
  ): Question {
    return new Question({
      ...props,
      slug: props.slug ?? Slug.createFromText(props.title),
      createdAt: props.createdAt ?? new Date(),
    });
  }

  get authorId() {
    return this.props.authorId;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get slug() {
    return this.props.slug;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  get isNew() {
    return dayjs(new Date()).diff(this.createdAt) <= 3;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat("...");
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromText(title);
    this.touch();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
    this.touch();
  }
}

