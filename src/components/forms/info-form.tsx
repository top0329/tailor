import { ArrowLeft } from "lucide-react";
import SubmitButton from "../buttons/submit-button";
import UserInput from "../inputs/user-input";
import AuthHeading from "../shared/auth-heading";
import ErrorMsg from "../shared/error";
import UserFormWrapper from "../wrappers/user-form-wrapper";
import { useRouter } from "next/navigation";

const InfoForm = () => {
  const router = useRouter();
  const handleSubmit = () => {
    router.push("/profile/preferences");
  };
  return (
    <UserFormWrapper>
      <AuthHeading
        header="Let's get to know each other!"
        sub="To build your personal profile"
      />
      <form className="flex flex-col gap-[32px]">
        <UserInput
          error=""
          label="First Name"
          type="text"
          placeholder="Enter your first name"
        />
        <UserInput
          error=""
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
        />
        <div className="flex flex-col gap-[8px]">
          <label className="text-m" htmlFor="grid-state">
            Gender
          </label>
          <div className="relative">
            <select
              className="px-[16px] py-[12px] border-first-stroke border-[1px] border-solid rounded-[8px] block appearance-none w-full focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
            >
              <option>female</option>
              <option>male</option>
              <option>others</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <ErrorMsg error={""} />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label className="text-m" htmlFor="grid-state">
            Date Of Birth
          </label>
          <input
            type="date"
            className="px-[16px] py-[12px] border-first-stroke border-[1px] border-solid rounded-[8px]"
          />
        </div>
        <div className="flex justify-between items-center">
          <button className="flex items-center gap-[8px] px-[16px] py-[8px]">
            <ArrowLeft size={16} />
            <p className="text-third-foreground">Back</p>
          </button>
          <SubmitButton onClick={handleSubmit} />
        </div>
      </form>
    </UserFormWrapper>
  );
};

export default InfoForm;
