import type { Submission } from "@/components/SentimentalWidget/types";
type SummaryProps = {
  submissions: Submission[];
};

export default function Summary({ submissions }: SummaryProps) {
  const totalSubmissions = submissions.length;
  const avgRating =
    submissions.reduce((acc, submission) => acc + submission.rating, 0) /
    totalSubmissions;

  const top3 = [...submissions]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 3);
  return (
    <div className="w-full text-left">
      <h3 className="mb-2 text-xl font-bold">Summary</h3>
      <div>Total submissions: {totalSubmissions}</div>
      <div>Average rating: {avgRating || "-"}</div>
      <hr className="my-4"></hr>
      <ul className="list-disc pl-4">
        {top3.map((submission, index) => (
          <li key={index}>"{submission.comment}"</li>
        ))}
      </ul>
    </div>
  );
}
