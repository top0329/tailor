import { cn } from "@/utils/cn";

const SubmitButton = ({
  type = "submit",
  disabled,
  isLoading,
  className,
  text,
  onClick,
}: {
  type?: "submit" | "button";
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  text?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "px-[16px] py-[8px] bg-highlight border-[1px] border-solid rounded-[80px] text-invert-foreground font-bold",
        disabled ? "opacity-50" : "",
        className
      )}
      onClick={onClick}
    >
      {isLoading ? "Loading..." : text ?? "Continue"}
    </button>
  );
};

export default SubmitButton;
