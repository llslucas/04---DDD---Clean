import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { CommentProps } from "./comments";

interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityId;
}

export class QuestionComment extends Entity<QuestionCommentProps> {
  static create(
    props: Optional<QuestionCommentProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    return new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );
  }

  get questionId() {
    return this.props.questionId;
  }
}

