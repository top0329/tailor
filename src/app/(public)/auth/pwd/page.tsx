import Image from "next/image";
import PwdForm from "@/app/_components/forms/pwd-form";
import UserMainWrapper from "@/app/_components/wrappers/user-main-wrapper";

const Page = () => {
  return (
    <UserMainWrapper>
      <PwdForm />
      <div className='relative w-full h-full lg:block hidden'>
        <Image
          src='/_static/bg1.png'
          alt='bg1'
          fill
          className='object-center object-contain'
        />
      </div>
    </UserMainWrapper>
  );
};

export default Page;
