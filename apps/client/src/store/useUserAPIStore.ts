import { create } from "zustand";

const useUserAPIStore = create((set) => ({
  apiName: "",
  loadApiName: (data: any) => set({ apiName: data }),
  apiUser: "",
  loadApiUser: (data: any) => set({ apiUser: data }),
  apiKey: "",
  loadApiKey: (data: any) => set({ apiKey: data }),
  dataLimit: 0,
  loadDataLimit: (data: any) => set({ dataLimit: data }),
  dataUsed: 0,
  loadDataUsed: (data: any) => set({ dataUsed: data }),
}));

export default useUserAPIStore;
