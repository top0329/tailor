import { create } from "zustand";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useFetch } from "../_helpers/client/useFetch";
import { Profile } from "./useProfileService";

export { useUserService };

const initialState = {
  user: undefined,
  currentUser: undefined,
};
const userStore = create<IUserStore>(() => initialState);

function useUserService(): IUserService {
  const fetch = useFetch();
  const router = useRouter();
  const { user, currentUser } = userStore();

  return {
    user,
    currentUser,
    register: async ({ email }: { email: string }) => {
      try {
        await fetch.post("/api/auth/register", { email });
        toast.success("Email registration successful!");

        router.push(`/auth/otp?email=${encodeURIComponent(email)}`);
      } catch (error: any) {
        toast.error(error);
      }
    },
    verifyOTP: async (otp: string, email: string) => {
      const OTP = parseInt(otp);
      try {
        const currentUser = await fetch.post("/api/auth/verify-otp", {
          otp: OTP,
          email,
        });
        userStore.setState({ ...initialState, currentUser });

        toast.success("OTP verified successfully!");
        router.push("/auth/pwd");
      } catch (error: any) {
        toast.error(error);
      }
    },
    createPwd: async (pwd: string) => {
      try {
        await fetch.post("/api/auth/pwd", { pwd });
        toast.success("Password created successfully!");
        router.push("/profile/invitation-code");
      } catch (error: any) {
        toast.error(error);
      }
    },
    createProfile: async (profile: Profile) => {
      try {
        await fetch.post("/api/auth/profile", { profile });
        toast.success("Onboarding finished successfully!");
        router.push("/en-test");
      } catch (error: any) {
        toast.error(error);
      }
    },
  };
}

interface IUser {
  id: string;
  email: string;
  otp?: number;
  emailVerified: boolean;
  password?: string;
  registerType: "male" | "female" | "notanswer";
}

interface IUserStore {
  user?: IUser;
  currentUser?: IUser;
}

interface IUserService extends IUserStore {
  register: ({ email }: { email: string }) => Promise<void>;
  verifyOTP: (otp: string, email: string) => Promise<void>;
  createPwd: (pwd: string) => Promise<void>;
  createProfile: (profile: Profile) => Promise<void>;
}
