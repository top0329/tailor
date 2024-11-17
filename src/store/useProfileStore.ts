import { create } from "zustand";
import { persist } from "zustand/middleware";

import { InterestCategory } from "@prisma/client";
interface PersonalInfo {
  firstName: string;
  lastName: string;
  gender: string;
  birth: string;
}

export interface Profile {
  invitationCode?: string;
  personalInfo?: PersonalInfo;
  interests?: InterestCategory[];
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
