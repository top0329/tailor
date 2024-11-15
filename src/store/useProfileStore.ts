import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  gender: string;
  birth: string;
}

export interface Profile {
  invitation?: string;
  personalInfo?: PersonalInfo;
  interests?: string[];
}

interface ProfileStore {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile: Profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: "profile-storage",
    }
  )
);
