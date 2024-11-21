const EnglishLevelTestButton = ({
  text,
  className,
  isClicked,
  onClick,
}: {
  text?: string;
  className?: string;
  isClicked: boolean;
  onClick?: () => void;
}) => {
  return (
    <div className={`flex ${isClicked ? "justify-end" : "justify-start"}`}>
      <button
        className={`bg-[#D0D7F1] border border-highlight-stroke ${className} ${
          isClicked
            ? "h-[40px] text-base w-[179px] rounded-sm px-3 py-2"
            : "h-[30px] text-sm w-[168px] rounded-[80px] px-4 py-1"
        }`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default EnglishLevelTestButton;
