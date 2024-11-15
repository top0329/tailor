import InfoForm from "@/components/forms/info-form";
import ChatInput from "@/components/inputs/chat-input";
import Teacher from "@/components/shared/teacher";
import UserMainWrapper from "@/components/wrappers/user-main-wrapper";
import { ArrowRightIcon } from "lucide-react";

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
