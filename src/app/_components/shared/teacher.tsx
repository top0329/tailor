const Teacher = ({ text }: { text: string }) => {
  return (
    <div className='flex flex-col gap-[8px]'>
      <div className='flex items-center gap-[8px]'>
        <div className='bg-highlight-foreground size-[24px] rounded-full'></div>
        <p className='text-third-foreground'>Teacher Anna</p>
      </div>
      <div className='bg-first py-[8px] px-[12px] rounded-[8px]'>
        <p className='text-black'>{text}</p>
      </div>
    </div>
  );
};

export default Teacher;
