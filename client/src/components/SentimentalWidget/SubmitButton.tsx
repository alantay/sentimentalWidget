import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
type SubmitButtonProps = {
  disabled?: boolean;
};
export default function SubmitButton({ disabled }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      aria-label="Submit"
      disabled={disabled}
      className={clsx(
        "bg-secondary text-secondary-foreground hover:bg-secondary/90 flex w-full cursor-pointer items-center justify-center rounded p-2 text-center transition",
        disabled && "pointer-events-none",
      )}
    >
      {disabled ? <LoaderCircle className="animate-spin" /> : "Submit"}
    </button>
  );
}
