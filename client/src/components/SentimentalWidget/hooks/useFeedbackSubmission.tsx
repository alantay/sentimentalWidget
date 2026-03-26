import type { Submission } from "@/components/SentimentalWidget/types";
import { useState } from "react";

export default function useFeedbackSubmission() {
  const [submission, setSubmission] = useState<Submission[]>([]);

  const addSubmission = (newSubmission: Omit<Submission, "createdAt">) => {
    setSubmission((prevSubmissions) => [
      ...prevSubmissions,
      { ...newSubmission, createdAt: Date.now() },
    ]);
  };

  return { submission, addSubmission };
}
