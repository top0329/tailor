import { create } from "zustand";
import { useRouter } from "next/navigation";

import { useAlertService } from "./useAlertService";
import { useFetch } from "../_helpers/client/useFetch";
import { Profile } from "@/store/useProfileStore";

export { useUserService };

const initialState = {
  user: undefined,
  currentUser: undefined,
};
const userStore = create<IUserStore>(() => initialState);

function useUserService(): IUserService {
  const alertService = useAlertService();
  const fetch = useFetch();
  const router = useRouter();
  const { user, currentUser } = userStore();

  return {
    user,
    currentUser,
    register: async (email: string, registerType: string) => {
      try {
        await fetch.post("/api/auth/register", { email, registerType });
        alertService.success("Registration successful!", true);

        if (registerType === "google") {
          router.push("/profile/invitation-code");
          return;
        }
        router.push("/auth/otp?email=" + encodeURIComponent(email));
      } catch (error: any) {
        alertService.error(error);
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

        alertService.success("OTP verified successfully!", true);
        router.push("/auth/pwd");
      } catch (error: any) {
        alertService.error(error);
      }
    },
    createPwd: async (pwd: string) => {
      try {
        await fetch.post("/api/auth/pwd", { pwd });
        alertService.success("Password created successfully!", true);
        router.push("/profile/invitation-code");
      } catch (error: any) {
        alertService.error(error);
      }
    },
    createProfile: async (profile: Profile) => {
      try {
        await fetch.post("/api/auth/profile", { profile });
        alertService.success("Onboarding finished successfully!");
        router.push("/en-test/");
      } catch (error: any) {
        alertService.error(error);
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
  register: (email: string, registerType: string) => Promise<void>;
  verifyOTP: (otp: string, email: string) => Promise<void>;
  createPwd: (pwd: string) => Promise<void>;
  createProfile: (profile: Profile) => Promise<void>;
}
