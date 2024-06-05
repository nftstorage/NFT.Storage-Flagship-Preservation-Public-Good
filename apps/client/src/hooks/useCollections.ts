"use client";
import {
  createCollection,
  fetchDealID,
  listCollections,
  viewCollection,
} from "@/services/ApiService";
import useCollectionStore from "@/store/useCollectionStore";
import { useState } from "react";
import toast from "react-hot-toast";

const useCollections = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const $userCollections = useCollectionStore(
    (state: any) => state.userCollections
  );
  const $loadUserCollections = useCollectionStore(
    (state: any) => state.loadUserCollections
  );
  const $userTokens = useCollectionStore((state: any) => state.userTokens);
  const $loadUserTokens = useCollectionStore(
    (state: any) => state.loadUserTokens
  );
  const $collectionName = useCollectionStore(
    (state: any) => state.collectionName
  );
  const $loadCollectionName = useCollectionStore(
    (state: any) => state.loadCollectionName
  );
  const $cidSearch = useCollectionStore((state: any) => state.cidSearch);
  const $loadCidSearch = useCollectionStore(
    (state: any) => state.loadCidSearch
  );
  const $collectionContractAddress = useCollectionStore(
    (state: any) => state.collectionContractAddress
  );
  const $loadCollectionContractAddress = useCollectionStore(
    (state: any) => state.loadCollectionContractAddress
  );
  const $collectoinChainID = useCollectionStore(
    (state: any) => state.collectoinChainID
  );
  const $loadCollectionChainID = useCollectionStore(
    (state: any) => state.loadCollectionChainID
  );
  const $collectionNetwork = useCollectionStore(
    (state: any) => state.collectionNetwork
  );
  const $loadCollectionNetwork = useCollectionStore(
    (state: any) => state.loadCollectionNetwork
  );
  const $collectionTokens = useCollectionStore(
    (state: any) => state.collectionTokens
  );
  const $loadCollectionTokens = useCollectionStore(
    (state: any) => state.loadCollectionTokens
  );
  const [filteredData, setFilteredData] = useState<any>($userTokens);

  const fetchCollections: () => any = () => {
    return listCollections().then((res: any) => {
      $loadUserCollections(res);
      // console.log(res);
      return res;
    });
  };
  const newCollection: () => any = () => {
    const collectionData = {
      // name: $collectionName,
      contractAddress: $collectionContractAddress,
      // chainID: $collectoinChainID,
      network: $collectionNetwork,
    };
    return createCollection(collectionData).then((res: any) => {
      toast.success("New Collection Created, adding tokens ...");
      return res;
    });
  };
  const fetchCollection = (collectionID: any) => {
    return viewCollection(collectionID)
      .then((res: any) => {
        // console.log(res, "from fetch collection");
        $loadCollectionTokens(res);
        return res;
      })
      .catch((error: any) => {
        console.error("Error fetching collection:", error);
      });
  };
  const fetchTokens = async () => {
    setIsLoading(true);
    const tokensPromise = fetchCollections().then((res: any) => {
      // console.log(res);
      const fetchTokenPromises = res.map((item: any) => {
        // console.log(item);
        return fetchCollection(item.collectionID).then((res) => {
          // console.log(res.value, "tokens of a collectoin");
          return res.value;
        });
      });

      return Promise.all(fetchTokenPromises);
    });

    tokensPromise
      .then((tokensArray: any) => {
        const tokens = tokensArray.flatMap((tokens: any) => tokens);
        // console.log(tokens, "all tokens from all collections");
        $loadUserTokens(tokens);
        setFilteredData(tokens);
        setIsLoading(false);
      })
      .catch((error: any) => {
        console.error("Error fetching tokens:", error);
        setIsLoading(false);
      });
  };
  const extractDealIds = async (cid: string) => {
    const dataArray = await fetchDealID(cid);
    const dealIdsArray: any = [];
    dataArray.forEach((obj: any) => {
      if (obj.hasOwnProperty("dealId")) {
        dealIdsArray.push(obj.dealId);
      }
    });
    const joinedDealIds = dealIdsArray.join(",");
    return joinedDealIds;
    // return dealIdsArray;
  };

  return {
    extractDealIds,
    fetchCollections,
    fetchCollection,
    fetchTokens,
    setFilteredData,
    filteredData,
    $userCollections,
    newCollection,
    $collectionName,
    $collectionContractAddress,
    $collectionNetwork,
    $collectoinChainID,
    $collectionTokens,
    $cidSearch,
    $loadCidSearch,
    $loadCollectionTokens,
    $loadCollectionChainID,
    $loadCollectionContractAddress,
    $loadCollectionName,
    $loadCollectionNetwork,
    $userTokens,
    isLoading,
  };
};

export default useCollections;
