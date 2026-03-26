import { useState } from "react";
import CommentBox from "./CommentBox";
import RatingChips from "./RatingChips";
import SubmitButton from "./SubmitButton";

function SentimentalWidget() {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const handleRating = (rating: number) => {
    setRating(rating);
  };

  const handleComment = (comment: string) => {
    setComment(comment);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (rating === null) {
      return;
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      <RatingChips value={rating} onChange={handleRating} />
      <CommentBox onChange={handleComment} value={comment} id="comment" />
      <SubmitButton />
    </form>
  );
}

export default SentimentalWidget;
