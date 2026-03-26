import { useRef, useState } from "react";
import CommentBox from "./CommentBox";
import useFeedbackSubmission from "./hooks/useFeedbackSubmission";
import RatingChips from "./RatingChips";
import SubmitButton from "./SubmitButton";
import Summary from "./Summary";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const SUCCESS_MSG = "Thank you for your feedback.";

function SentimentalWidget() {
  const [lockForm, setLockForm] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [confirmationMsg, setConfirmationMsg] = useState("");
  const { submission, addSubmission } = useFeedbackSubmission();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showConfirmationMsg = (message: string) => {
    setConfirmationMsg(message);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setConfirmationMsg("");
    }, 4000);
  };

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

    addSubmission({ rating, comment });
    setRatingError("");
    showConfirmationMsg(SUCCESS_MSG);
    setLockForm(true);

    await sleep(3000);
    setComment("");
    setRating(null);
    setLockForm(false);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4">
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
      <div>
        {ratingError && <p className="text-rating-error">{ratingError}</p>}
        {confirmationMsg && <p className="text-center">{confirmationMsg}</p>}
      </div>
    </div>
  );
}

export default SentimentalWidget;
