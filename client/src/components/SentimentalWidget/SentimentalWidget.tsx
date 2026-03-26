import { saveFeedback } from "@/api/feedback";
import { useState } from "react";
import CommentBox from "./CommentBox";
import RatingChips from "./RatingChips";
import SubmitButton from "./SubmitButton";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function SentimentalWidget() {
  const [lockForm, setLockForm] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [ratingError, setRatingError] = useState("");
  const handleRating = (rating: number) => {
    setRatingError("");
    setRating(rating);
  };

  const handleComment = (comment: string) => {
    setComment(comment);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (rating === null) {
      setRatingError("Please select a rating");
      return; // prevent form submission
    }
    setLockForm(true);
    await saveFeedback({
      rating,
      comment,
    });

    await sleep(3000);
    setLockForm(false);
  };
  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      <RatingChips value={rating} onChange={handleRating} disabled={lockForm} />
      {ratingError && <p className="text-rating-error">{ratingError}</p>}
      <CommentBox
        onChange={handleComment}
        value={comment}
        name="comment"
        disabled={lockForm}
      />
      <SubmitButton disabled={lockForm} />
    </form>
  );
}

export default SentimentalWidget;
