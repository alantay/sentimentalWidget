const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export type FeedbackSummary = {
  totalSubmissions: number;
  averageRating: number | null;
  recentComments: string[];
};

export async function submitFeedback(input: {
  rating: number;
  comment: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to submit feedback.");
  }

  return response.json();
}

export async function fetchFeedbackSummary(): Promise<FeedbackSummary> {
  const response = await fetch(`${API_BASE_URL}/api/feedback/summary`);

  if (!response.ok) {
    throw new Error("Failed to fetch feedback summary.");
  }

  return response.json();
}
