import MaxWidthWrapper from "@/app/_components/wrappers/max-width-wrapper";
import Logo from "@/app/_components/shared/logo";
import LandHeading from "@/app/_components/shared/land-heading";
import UserEmailForm from "@/app/_components/forms/user-email-form";

export default function Home() {
  return (
    <div
      className="bg-no-repeat bg-contain"
      style={{ backgroundImage: "url(/_static/background.png)" }}
    >
      <MaxWidthWrapper>
        <div className="min-h-screen flex justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-[32px]">
            <Logo />
            <LandHeading />
            <UserEmailForm />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
