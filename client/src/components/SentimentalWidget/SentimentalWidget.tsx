import { sleep } from "@/utils/sleep";
import { useState } from "react";
import CommentBox from "./CommentBox";
import useFeedbackSubmission from "./hooks/useFeedbackSubmission";
import RatingChips from "./RatingChips";
import SubmitButton from "./SubmitButton";
import Summary from "./Summary";

const SUCCESS_MSG = "❤️ Thank you for your feedback.";
const VALIDATION_RATING_ERROR = "🙏 Please select a rating";

function SentimentalWidget() {
  const [lockForm, setLockForm] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [confirmationMsg, setConfirmationMsg] = useState("");
  const { submission, addSubmission } = useFeedbackSubmission();

  const handleRating = (rating: number) => {
    setConfirmationMsg("");
    setRatingError("");
    setRating(rating);
  };

  const handleComment = (comment: string) => {
    setConfirmationMsg("");
    setComment(comment);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (rating === null) {
      setConfirmationMsg("");
      setRatingError(VALIDATION_RATING_ERROR);
      return; // prevent form submission
    }

    addSubmission({ rating, comment });
    setRatingError("");
    setConfirmationMsg(SUCCESS_MSG);
    setLockForm(true);

    await sleep(3000);
    setComment("");
    setRating(null);
    setLockForm(false);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border p-4">
        <h2 className="text-3xl">Mini Sentimental Widget</h2>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center justify-center gap-4"
        >
          <RatingChips
            value={rating}
            onChange={handleRating}
            disabled={lockForm}
          />
          <CommentBox
            onChange={handleComment}
            value={comment}
            name="comment"
            disabled={lockForm}
          />
          <SubmitButton disabled={lockForm} />
        </form>
        <Summary submissions={submission} />
      </div>
      <div className="mt-4">
        {ratingError && <p className="text-rating-error">{ratingError}</p>}
        {confirmationMsg && <p className="text-accent">{confirmationMsg}</p>}
      </div>
    </>
  );
}

export default SentimentalWidget;
