import { ArrowRightIcon } from "lucide-react";

const ChatInput = () => {
  return (
    <div className='flex justify-between items-center pl-[32px] pr-[12px] py-[8px] rounded-[80px] bg-first'>
      <input
        type='text'
        placeholder='Talk to Teacher Anna'
        className='focus:outline-none'
      ></input>
      <button className='p-[8px] rounded-[80px] opacity-50 border border-highlight-stroke'>
        <ArrowRightIcon size={24} />
      </button>
    </div>
  );
};

export default ChatInput;
