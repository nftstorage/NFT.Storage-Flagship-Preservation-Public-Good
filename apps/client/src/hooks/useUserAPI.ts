import {
  createApiKey,
  deleteAPIkey,
  fetchApi,
  fetchBalance,
} from "@/services/ApiService";
import useUserAPIStore from "@/store/useUserAPIStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useUserAPI = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const $apiName = useUserAPIStore((state: any) => state.apiName);
  const $loadApiName = useUserAPIStore((state: any) => state.loadApiName);
  const $apiUser = useUserAPIStore((state: any) => state.apiUser);
  const $loadApiUser = useUserAPIStore((state: any) => state.loadApiUser);
  const $apiKey = useUserAPIStore((state: any) => state.apiKey);
  const $loadApiKey = useUserAPIStore((state: any) => state.loadApiKey);
  const $dataUsed = useUserAPIStore((state: any) => state.dataUsed);
  const $loadDataUsed = useUserAPIStore((state: any) => state.loadDataUsed);
  const $dataLimit = useUserAPIStore((state: any) => state.dataLimit);
  const $loadDataLimit = useUserAPIStore((state: any) => state.loadDataLimit);
  const router = useRouter();

  const createAPI = async (keyName: string, role: string) => {
    try {
      const res = await createApiKey(keyName, role);
      // console.log("from useUserAPI", res.value.apiKey);
      $loadApiKey(res.value.apiKey);
      setIsLoading(false);
      return res;
    } catch (error) {
      console.error("Error creating API:", error);
      throw error;
    }
  };

  const deleteAPI = async (keyID: string) => {
    const res = await deleteAPIkey(keyID);
    const res2 = await fetchApi();
    $loadApiUser(res2.value);
  };

  const fetchUserBalance = async () => {
    fetchBalance().then((res) => {
      if (res) {
        $loadDataLimit(Number(res?.value?.dataLimit) / 1073741824);
        $loadDataUsed(Number(res?.value?.dataUsed) / 1073741824);
      }
    });
  };

  return {
    $apiName,
    $loadApiName,
    $apiUser,
    $loadApiUser,
    createAPI,
    $apiKey,
    $dataLimit,
    $dataUsed,
    deleteAPI,
    fetchUserBalance,
  };
};
export default useUserAPI;
