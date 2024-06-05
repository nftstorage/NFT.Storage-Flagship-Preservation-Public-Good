import { create } from "zustand";

const usePaymentStore = create((set) => ({
  userTransactions: "",
  loadUserTransactions: (data: any) => set({ userTransactions: data }),
}));

export default usePaymentStore;
