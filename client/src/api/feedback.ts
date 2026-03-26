type FeedbackInput = {
  rating: number;
  comment: string;
};

export async function saveFeedback(input: FeedbackInput) {
  return Promise.resolve(input);
}
