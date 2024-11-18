import { create } from "zustand";
import { persist } from "zustand/middleware";

import { InterestCategory } from "@prisma/client";

export { useProfileStore };

const useProfileStore = create<ProfileService>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile: Partial<Profile>) =>
        set((state) => ({ profile: { ...state.profile, ...profile } })),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: "profile-storage",
    }
  )
);

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

interface ProfileService {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
}
