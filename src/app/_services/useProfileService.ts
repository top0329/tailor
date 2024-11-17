import { create } from "zustand";
// import { persist } from "zustand/middleware";

import { InterestCategory } from "@prisma/client";

export { useProfileService };

const initialState = {
  invitationCode: undefined,
  personalInfo: undefined,
  interests: undefined,
};

const userStore = create<ProfileService>((set) => ({
  ...initialState,
  profile: null,
  setProfile: (profile: Partial<Profile>) =>
    set((state) => ({ ...state, ...profile })),
  clearProfile: () => set(() => ({ ...initialState })),
}));

function useProfileService(): ProfileService {
  const {
    invitationCode,
    personalInfo,
    interests,
    profile,
    setProfile,
    clearProfile,
  } = userStore();

  return {
    invitationCode,
    personalInfo,
    interests,
    profile,
    setProfile,
    clearProfile,
  };
}

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

interface ProfileService extends Profile {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
}
