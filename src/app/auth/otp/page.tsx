import OTPForm from "@/components/forms/otp-form";
import Header from "@/components/shared/header";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex items-center p-[64px] gap-[48px] flex-1">
        <OTPForm />
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default page;
