import InvitationCodeForm from "@/app/_components/forms/invitation-code-form";
import UserMainWrapper from "@/app/_components/wrappers/user-main-wrapper";
import Image from "next/image";

const Page = () => {
  return (
    <UserMainWrapper>
      <InvitationCodeForm />
      <div className="relative w-full h-full lg:block hidden rounded-[32px]">
        <Image
          src="/_static/bg2.png"
          alt="bg1"
          fill
          className="object-center object-cover rounded-[32px]"
        />
      </div>
    </UserMainWrapper>
  );
};

export default Page;
