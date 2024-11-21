"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import { useProfileStore } from "@/app/_services";
import SubmitButton from "../buttons/submit-button";
import UserInput from "../inputs/user-input";
import AuthHeading from "../shared/auth-heading";
import UserFormWrapper from "../wrappers/user-form-wrapper";

const InvitationCodeForm = () => {
  const { profile, setProfile } = useProfileStore();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setProfile({ invitationCode: code });
    setIsLoading(false);
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
          onChange={(e) => handleChange(e)}
          defaultValue={profile?.invitationCode}
          error=""
          label="Invitation Code"
          type="text"
          placeholder="Enter invitation code"
        />
        <div className="flex justify-end items-center gap-[16px]">
          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              setProfile({ invitationCode: "" });
              router.push("/profile/info");
            }}
          >
            <p>Skip, I don&apos;t have it</p>
          </button>
          <SubmitButton
            type="button"
            className="w-[240px]"
            onClick={handleSubmit}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </div>
      </div>
    </UserFormWrapper>
  );
};

export default InvitationCodeForm;
