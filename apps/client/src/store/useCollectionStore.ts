import { create } from "zustand";

const useCollectionStore = create((set) => ({
  userCollections: [],
  loadUserCollections: (data: any) => set({ userCollections: data }),
  userTokens: [],
  loadUserTokens: (data: any) => set({ userTokens: data }),
  collectionName: "",
  loadCollectionName: (data: any) => set({ collectionName: data }),
  collectionContractAddress: "",
  loadCollectionContractAddress: (data: any) =>
    set({ collectionContractAddress: data }),
  collectoinChainID: "",
  loadCollectionChainID: (data: any) => set({ collectoinChainID: data }),
  collectionNetwork: "",
  loadCollectionNetwork: (data: any) => set({ collectionNetwork: data }),
  collectionTokens: {},
  loadCollectionTokens: (data: any) => set({ collectionTokens: data }),
  cidSearch: "",
  loadCidSearch: (data: any) => set({ cidSearch: data }),
}));

export default useCollectionStore;
