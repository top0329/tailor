import OPTForm from "@/components/forms/opt-form";
import Header from "@/components/shared/header";

const page = () => {
  return (
    <div className='min-h-screen'>
      <Header />
      <div className='flex items-center p-[64px] gap-[48px]'>
        <div className='flex flex-col gap-[32px] flex-1 rounded-[16px]'>
          <div className='flex flex-col gap-[8px]'>
            <p className='text-h2 text-second-foreground font-[500]'>
              Welcome to Reroute
            </p>
            <p className='text-h4 text-third-foreground'>
              Please Verify Your Email
            </p>
          </div>
          <OPTForm />
        </div>
        <div className='flex-1'></div>
      </div>
    </div>
  );
};

export default page;
