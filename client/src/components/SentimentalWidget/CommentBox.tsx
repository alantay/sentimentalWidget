import clsx from "clsx";
type CommentBoxProps = {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  disabled?: boolean;
};

export default function CommentBox({
  value,
  onChange,
  name,
  disabled,
  ...rest
}: CommentBoxProps) {
  return (
    <textarea
      name={name}
      placeholder="Enter your comment"
      className={clsx(
        "border-border h-24 w-full rounded border p-2 text-sm",
        disabled && "border-muted bg-muted",
      )}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      disabled={disabled}
      {...rest}
    ></textarea>
  );
}
