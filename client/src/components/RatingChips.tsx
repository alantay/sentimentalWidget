import { HeartIcon } from "lucide-react";
import { useState } from "react";

type RatingChipsProps = {
  value: number | null;
  onChange: (rating: number) => void;
  disabled?: boolean;
};

export default function RatingChips({ value, onChange }: RatingChipsProps) {
  const [rating, setRating] = useState(value ?? 0);
  return (
    <ul>
      <li>
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <button className="relative ">
              <HeartIcon
                className={`w-10 h-10 text-(--rating-active) ${rating > index ? "fill-(--rating-active)" : ""}`}
              />
              <span className="absolute  top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 text-center text-sm font-black">
                {index + 1}
              </span>
            </button>
          );
        })}
      </li>
    </ul>
  );
}
