"use client";

import { ArrowLeft } from "lucide-react";
import SubmitButton from "../buttons/submit-button";
import UserInput from "../inputs/user-input";
import AuthHeading from "../shared/auth-heading";
import ErrorMsg from "../shared/error";
import UserFormWrapper from "../wrappers/user-form-wrapper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useProfileStore } from "@/store/useProfileStore";

const InfoForm = () => {
  const { profile, setProfile } = useProfileStore();
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState(profile?.personalInfo?.firstName);
  const [lastName, setLastName] = useState(profile?.personalInfo?.lastName);
  const [gender, setGender] = useState(profile?.personalInfo?.gender);
  const [birth, setBirth] = useState(profile?.personalInfo?.birth);
  // const [err, setErr] = useState("");

  console.log(profile);
  const router = useRouter();
  const handleSubmit = () => {
    setIsLoading(true);

    setProfile({
      ...profile,
      personalInfo: {
        firstName: firstName ?? "",
        lastName: lastName ?? "",
        gender: gender ?? "",
        birth: birth ?? "",
      },
    });
    setIsLoading(false);
    router.push("/profile/interests");
  };
  return (
    <UserFormWrapper>
      <AuthHeading
        header="Let's get to know each other!"
        sub='To build your personal profile'
      />
      <div className='flex flex-col gap-[32px]'>
        <UserInput
          defaultValue={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error=''
          label='First Name'
          type='text'
          placeholder='Enter your first name'
        />
        <UserInput
          defaultValue={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error=''
          label='Last Name'
          type='text'
          placeholder='Enter your last name'
        />
        <div className='flex flex-col gap-[8px]'>
          <label className='text-m' htmlFor='grid-state'>
            Gender
          </label>
          <div className='relative'>
            <select
              defaultValue={gender}
              className='px-[16px] py-[12px] border-first-stroke border-[1px] border-solid rounded-[8px] block appearance-none w-full focus:outline-none focus:bg-white focus:border-gray-500'
              onChange={(e) => setGender(e.target.value)}
              id='grid-state'
            >
              <option value=''>Please Select</option>
              <option value='female'>Female</option>
              <option value='male'>Male</option>
              <option value='notanswer'>Perfer not to answer</option>
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
          <ErrorMsg error={""} />
        </div>
        <div className='flex flex-col gap-[8px]'>
          <label className='text-m' htmlFor='grid-state'>
            Date Of Birth
          </label>
          <input
            defaultValue={birth}
            onChange={(e) => setBirth(e.target.value)}
            type='date'
            className='px-[16px] py-[12px] border-first-stroke border-[1px] border-solid rounded-[8px]'
          />
        </div>
        <div className='flex justify-between items-center'>
          <button
            type='button'
            className='flex items-center gap-[8px] px-[16px] py-[8px]'
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} />
            <div className='text-third-foreground'>Back</div>
          </button>
          <SubmitButton
            onClick={handleSubmit}
            disabled={!firstName || !lastName || !gender || !birth || isLoading}
            isLoading={isLoading}
          />
        </div>
      </div>
    </UserFormWrapper>
  );
};

export default InfoForm;
