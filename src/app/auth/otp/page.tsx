import OTPForm from "@/components/forms/otp-form";
import UserMainWrapper from "@/components/wrappers/user-main-wrapper";
import Image from "next/image";

const Page = () => {
  return (
    <UserMainWrapper>
      <OTPForm />
      <div className="relative w-full h-full lg:block hidden">
        <Image
          src="/_static/bg1.png"
          alt="bg1"
          fill
          className="object-center"
        />
      </div>
    </UserMainWrapper>
  );
};

export default Page;
