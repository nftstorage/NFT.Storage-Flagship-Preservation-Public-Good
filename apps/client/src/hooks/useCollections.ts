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
  const newCollection: (tempContractAddress: any) => any = (
    tempContractAddress: any
  ) => {
    const collectionData = {
      // name: $collectionName,
      contractAddress: tempContractAddress,
      // chainID: $collectoinChainID,
      network: $collectionNetwork,
    };
    return createCollection(collectionData).then((res: any) => {
      toast.success("New Collection Created, adding tokens ...");
      return res;
    });
  };
  const fetchCollection = (collectionID: any, pageNumber?: number) => {
    return viewCollection(collectionID, pageNumber)
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
    try {
      const collections = await fetchCollections();
      let allTokens: any[] = [];

      for (const collection of collections) {
        let pageNumber = 1;
        let collectionTokens: any[] = [];

        for (let i = 0; ; i++) {
          const response = await fetchCollection(
            collection.collectionID,
            pageNumber
          );
          if (i == 0) {
            collectionTokens = [...collectionTokens, ...response.value];
          }
          if (response.value.length == 0) break;
          if (
            i != 0 &&
            response.value[response.value.length - 1].cid ==
              collectionTokens[collectionTokens.length - 1].cid
          ) {
            break;
          }
          if (i != 0) {
            collectionTokens = [...collectionTokens, ...response.value];
          }
          pageNumber++;
        }
        allTokens = [...allTokens, ...collectionTokens];
      }

      $loadUserTokens(allTokens);
      console.log(allTokens);
      setFilteredData(allTokens);
    } catch (error) {
      console.error("Error fetching tokens:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const extractDealIds = async (cid: string) => {
    const dataObject = await fetchDealID(cid);
    const dataArray = dataObject.value;
    const dealIdsArray: any = [];
    dataArray.forEach((obj: any) => {
      obj.deal.forEach((deal: any) => {
        if (deal.hasOwnProperty("dealId")) {
          dealIdsArray.push(deal.dealId);
        }
      });
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
