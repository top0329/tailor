import UserEmailForm from "@/components/forms/user-email-form";
import Logo from "@/components/shared/logo";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-[32px]">
        <Logo />
        <div className="flex flex-col gap-[8px] text-center">
          <h5 className="text-h5 text-third-foreground">
            Discover English Fluency with AI-Driven Language Learning
          </h5>
          <h2 className="text-h2">
            Ignite Your Passion
            <br />
            Empower Your Progress
          </h2>
        </div>
        <UserEmailForm />
      </div>
    </div>
  );
}
