import { ChangeEventHandler } from "react";
import ErrorMsg from "../shared/error";

const UserInput = ({
  error,
  label,
  type,
  placeholder,
  defaultValue,
  onChange,
}: {
  error: string;
  label: string;
  type: string;
  placeholder: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div className='flex flex-col gap-[8px]'>
      <p className='text-m'>{label}</p>
      <input
        onChange={onChange}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        className='px-[16px] py-[12px] border-first-stroke border-[1px] border-solid rounded-[8px]'
      />
      <ErrorMsg error={error} />
    </div>
  );
};

export default UserInput;
