import OTPForm from "@/components/forms/otp-form";
import Header from "@/components/shared/header";
import AuthMainWrapper from "@/components/wrappers/auth-main-wrapper";
import Image from "next/image";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AuthMainWrapper>
        <OTPForm />
        <div className="relative w-full h-full lg:block hidden">
          <Image
            src="/_static/bg1.png"
            alt="bg1"
            fill
            className="object-center"
          />
        </div>
      </AuthMainWrapper>
    </div>
  );
};

export default page;
