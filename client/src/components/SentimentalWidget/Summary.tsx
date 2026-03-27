type SummaryProps = {
  totalSubmissions: number;
  averageRating: number | null;
  recentComments: string[];
};

export default function Summary({
  totalSubmissions,
  averageRating,
  recentComments,
}: SummaryProps) {
  return (
    <section className="w-full text-left" aria-label="feedback summary">
      <h3 className="mb-2 text-xl font-bold">Summary</h3>
      <div>Total submissions: {totalSubmissions}</div>
      <div>Average rating: {averageRating || "-"}</div>
      <hr className="my-4"></hr>
      <ul className="list-disc pl-4">
        {recentComments.map((comment, index) => (
          <li key={index}>"{comment}"</li>
        ))}
      </ul>
    </section>
  );
}
