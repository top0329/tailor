import ErrorMsg from "../shared/error";

const UserInput = ({
  error,
  label,
  type,
  placeholder,
}: {
  error: string;
  label: string;
  type: string;
  placeholder: string;
}) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <p className="text-m">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        className="px-[16px] py-[12px] border-first-stroke border-[1px] border-solid rounded-[8px]"
      />
      <ErrorMsg error={error} />
    </div>
  );
};

export default UserInput;
