import { FormEventHandler } from "react";

const UserFormWrapper = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}) => {
  return (
    <form
      className="flex flex-col gap-[32px] rounded-[16px]"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default UserFormWrapper;
