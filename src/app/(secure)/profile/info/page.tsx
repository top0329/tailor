import InfoForm from "@/app/_components/forms/info-form";
import ChatInput from "@/app/_components/inputs/chat-input";
import Teacher from "@/app/_components/shared/teacher";
import UserMainWrapper from "@/app/_components/wrappers/user-main-wrapper";

const Page = () => {
  return (
    <UserMainWrapper>
      <InfoForm />
      <div className='h-full flex flex-col justify-between gap-[32px] bg-third p-[16px] rounded-[32px]'>
        <div className='flex flex-col gap-[24px] p-[16px]'>
          <Teacher
            text='Hello and welcome to your online learning journey! I am here as
                your dedicated online teacher, ready to guide you every step of
                the way.'
          />
        </div>
        <ChatInput />
      </div>
    </UserMainWrapper>
  );
};

export default Page;
