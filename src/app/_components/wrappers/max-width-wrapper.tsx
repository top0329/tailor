const MaxWidthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative w-full max-w-[1440px] mx-auto'>{children}</div>
  );
};

export default MaxWidthWrapper;
