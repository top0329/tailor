import { create } from "zustand";

export { useLoadingService };

const useLoadingService = create<ILoadingStore>((set) => ({
  isLoading: true,
  setIsLoading: (status: boolean) => set({ isLoading: status }),
}));

interface ILoadingStore {
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
}
