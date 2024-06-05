import { create } from "zustand";

const useAuthStore = create((set) => ({
  refreshToken: "",
  loadRefreshToken: (data: any) => set({ refreshToken: data }),
  accessToken: "",
  loadAccessToken: (data: any) => set({ accessToken: data }),
  userEmail: "",
  loadUserEmail: (data: any) =>
    set((state: any) => ({
      userEmail: data,
    })),
}));

export default useAuthStore;
