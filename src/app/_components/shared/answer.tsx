import Teacher from "./teacher";

const Answer = () => {
  
  return (
    <div className='basis-1/3 flex flex-col p-[24px]'>
      <div className='flex-1 flex flex-col gap-[8px] rounded-[16px] border border-first-stroke'>
        <div className='bg-extra p-[12px] rounded-t-[16px]'>
          <p className='text-invert-foreground font-bold'>English Level Test</p>
        </div>
        <div className='p-[16px]'>
          <div className='flex flex-col gap-[10px]'>
            <Teacher text='Hi, Judy! We are about to administer an English assessment to determine your current level of proficiency.' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answer;
