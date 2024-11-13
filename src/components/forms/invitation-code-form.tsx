"use client";
import { useRouter } from "next/navigation";
import SubmitButton from "../buttons/submit-button";
import UserInput from "../inputs/user-input";
import AuthHeading from "../shared/auth-heading";
import UserFormWrapper from "../wrappers/user-form-wrapper";
import Link from "next/link";

const InvitationCodeForm = () => {
  const router = useRouter();
  const handleSubmit = () => {
    router.push("/profile/info");
  };
  return (
    <UserFormWrapper>
      <AuthHeading
        header="Let's get started"
        sub="Do you have existing plan invitation Code?"
      />
      <div className="flex flex-col gap-[32px]">
        <UserInput
          error=""
          label="Invitation Code"
          type="text"
          placeholder="Enter invitation code"
        />
        <div className="flex justify-end items-center gap-[16px]">
          <Link href="/profile/info">
            <p>Skip, I don&apos;t have it</p>
          </Link>
          <SubmitButton className="w-[240px]" onClick={handleSubmit} />
        </div>
      </div>
    </UserFormWrapper>
  );
};

export default InvitationCodeForm;
