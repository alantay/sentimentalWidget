type SubmitButtonProps = {
  disabled?: boolean;
};
export default function SubmitButton({ disabled }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="bg-accent text-text rounded p-2"
    >
      Submit
    </button>
  );
}
