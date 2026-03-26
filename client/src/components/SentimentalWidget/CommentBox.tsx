type CommentBoxProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  id?: string;
};

export default function CommentBox({
  value,
  onChange,
  disabled,
  id,
}: CommentBoxProps) {
  return (
    <textarea
      id={id}
      placeholder="Enter your comment"
      className="border-border h-24 rounded border p-2 text-sm"
      onChange={(e) => onChange(e.target.value)}
      value={value}
      disabled={disabled}
    ></textarea>
  );
}
