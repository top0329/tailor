import InvitationCodeForm from "@/components/forms/invitation-code-form";
import UserMainWrapper from "@/components/wrappers/user-main-wrapper";
import Image from "next/image";

const page = () => {
  return (
    <UserMainWrapper>
      <InvitationCodeForm />
      <div className="relative w-full h-full lg:block hidden">
        <Image
          src="/_static/bg2.png"
          alt="bg1"
          fill
          className="object-center"
        />
      </div>
    </UserMainWrapper>
  );
};

export default page;
