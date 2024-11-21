import Header from "@/app/_components/shared/header";
import MaxWidthWrapper from "@/app/_components/wrappers/max-width-wrapper";
import { auth } from "@/app/_helpers/server";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  if (await auth.isProfileFilled()) {
    redirect("/en-test");
  }
  return (
    <MaxWidthWrapper>
      <div className="min-h-screen flex flex-col">
        <Header />
        {children}
      </div>
    </MaxWidthWrapper>
  );
};

export default layout;
