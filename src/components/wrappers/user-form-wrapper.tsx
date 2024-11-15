const UserFormWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col gap-[32px] rounded-[16px]'>{children}</div>
  );
};

export default UserFormWrapper;
