import clsx from "clsx";
import { HeartIcon } from "lucide-react";
import { useState } from "react";

type RatingChipsProps = {
  value: number | null;
  onChange: (rating: number) => void;
  disabled?: boolean;
};

export default function RatingChips({
  value,
  onChange,
  disabled,
}: RatingChipsProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const displayValue = hoveredValue ?? value; // hover will take precedence

  const handleHover = (value: number | null) => {
    setHoveredValue(value);
  };

  const handleClick = (index: number) => {
    onChange(index + 1);
  };

  return (
    <ul className="flex">
      {Array.from({ length: 5 }).map((_, index) => {
        const isActive = displayValue !== null && index < displayValue;
        return (
          <li key={index}>
            <button
              className={clsx(
                "relative cursor-pointer",
                disabled && "pointer-events-none",
              )}
              type="button"
              aria-label={`Rate ${index + 1} out of 5`}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHover(null)}
              disabled={disabled}
            >
              <HeartIcon
                className={clsx(
                  "h-14 w-14 p-1",
                  isActive && "text-rating-active fill-rating-active",
                  "hover:fill-rating-active hover:text-rating-active",
                  disabled && "text-rating-inactive fill-rating-inactive",
                )}
              />
              <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-sm font-black">
                {index + 1}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
