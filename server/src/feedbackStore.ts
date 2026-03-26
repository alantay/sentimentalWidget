export type Submission = {
  rating: number;
  comment: string;
  createdAt: number;
};

const submissions: Submission[] = [];

export const addSubmission = (newSubmission: Omit<Submission, "createdAt">) => {
  submissions.unshift({
    ...newSubmission,
    createdAt: Date.now(),
  });
};

export function getSummary() {
  const totalSubmissions = submissions.length;
  const averageRating =
    submissions.reduce((acc, { rating }) => acc + rating, 0) / totalSubmissions;
  const recentComments = submissions
    .filter(({ comment }) => !!comment.trim())
    .splice(0, 3)
    .map(({ comment }) => comment);

  return { totalSubmissions, averageRating, recentComments };
}
