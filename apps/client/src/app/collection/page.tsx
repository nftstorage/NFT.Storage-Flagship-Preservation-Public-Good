"use client";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import Dropdown from "@/_ui/dropdown/Dropdown";
import FileUpload from "@/_ui/fileUpload/FileUpload";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import FlexWindow from "@/_ui/flex/FlexWindow";
import IconBase from "@/_ui/icons/IconBase";
import InputLabel from "@/_ui/input/InputLabel";
import Modal from "@/_ui/modal/Modal";
import NavLeft from "@/_ui/nav/NavLeft";
import TableNative from "@/_ui/table/TableNative";
import Text from "@/_ui/text/Text";
import useCollections from "@/hooks/useCollections";
import { tokenUpload } from "@/services/ApiService";
import style from "@/styles/GlobalConstants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DashBoard() {
  const [createCollection, setCreateCollection] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const router = useRouter();

  const hookCollections = useCollections();

  const options = [
    { value: "eth", label: "eth", icon: <IconBase slug="logo-eth" /> },
    { value: "polygon", label: "polygon", icon: <IconBase slug="logo-eth" /> },
    { value: "base", label: "base", icon: <IconBase slug="logo-eth" /> },
  ];

  const openCollectionModal = () => {
    setCreateCollection(true);
  };

  const closeCollectionModal = () => {
    setCreateCollection(false);
  };

  const handleDropdownChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (file.type === "text/csv") {
      const formData = new FormData();
      formData.append("csvFile", file);
      tokenUpload(formData);
    } else {
      toast.error("Please upload a CSV file.");
    }
  };

  const onFileUpload = async (file: File) => {
    setUploadedFile(file);
  };

  const columns: any = [
    { key: "collectionID", header: "Collection ID" },
    { key: "name", header: "Name" },
    { key: "contractAddress", header: "Address" },
    { key: "blockchainNet", header: "Network" },
  ];

  useEffect(() => {
    // // console.log("Fetching collections...");
    // hookCollections.fetchCollections();
  }, []);
  return (
    <FlexWindow
      navLeft={<NavLeft />}
      bodyElem={
        <>
          <div
            style={{
              width: "100%",
              // padding: "1.5rem",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: `${style.color.secondary}`,
            }}
          >
            <FlexColumn>
              <div
                style={{
                  borderBottom: "1px solid black ",
                  width: "100%",
                  height: "fit-content",
                }}
              >
                <FlexColumn
                  padding="1.5rem "
                  vrAlign="flex-start"
                  height="fit-content"
                  hrAlign="flex-start"
                >
                  <FlexRow hrAlign="flex-start">
                    <Text
                      fontSize={style.font.h3}
                      marginBottom={style.margin.xxs}
                    >
                      Collections
                    </Text>
                    <div
                      style={{
                        background: style.color.lightSecondry,
                        padding: `${style.padding.xxxs} ${style.padding.xxs} ${style.padding.xxxs} ${style.padding.xxs}`,
                        marginBottom: style.margin.xxxs,
                        marginLeft: style.margin.xxs,
                      }}
                    >
                      {hookCollections.$userCollections?.length || "0"}
                    </div>
                  </FlexRow>
                  <Text marginBottom={style.margin.xs}>
                    You can see all your collections here
                  </Text>
                  <FlexRow hrAlign="space-between">
                    <FlexRow width="fit-content">
                      <InputLabel
                        placeholder="Search by CID..."
                        marginRight={style.margin.xs}
                      />
                      <ButtonNative
                        text="Filter"
                        width="100px"
                        hrAlign={"center"}
                        paddingBottom="9px"
                        paddingTop="9px"
                        borderColor="#000"
                      />
                    </FlexRow>
                    <ButtonNative
                      onClick={openCollectionModal}
                      variant="dark"
                      width="fit-content"
                    >
                      Create Collection
                    </ButtonNative>
                  </FlexRow>
                </FlexColumn>
              </div>
              {/* {console.log(
                hookCollections?.$userCollections,
                "userCollections "
              )} */}
              {hookCollections.$userCollections?.length ? (
                <FlexColumn hrAlign="flex-start">
                  <TableNative
                    data={hookCollections?.$userCollections}
                    columns={columns}
                  />
                </FlexColumn>
              ) : (
                <FlexColumn width="400px">
                  <Text
                    align="center"
                    fontSize={style.font.h3}
                    marginBottom={style.margin.sm}
                  >
                    Create your first collection!
                  </Text>
                  <Text align="center" marginBottom={style.margin.sm}>
                    Descriptive body text should provide detailed action
                    information.
                  </Text>
                  <ButtonNative
                    onClick={openCollectionModal}
                    variant="dark"
                    width="fit-content"
                  >
                    Create Collection
                  </ButtonNative>
                </FlexColumn>
              )}
            </FlexColumn>
          </div>

          <Modal
            isOpen={createCollection}
            onClose={closeCollectionModal}
            size="md"
            body={
              <>
                <FlexColumn>
                  <Text fontSize={style.font.h4}>Create Collection</Text>
                  <Text
                    marginBottom={style.margin.xs}
                    marginTop={style.margin.xs}
                  >
                    A descriptive body text comes here.
                  </Text>
                  <InputLabel
                    placeholder="Name"
                    marginBottom={style.margin.sm}
                    label="Name"
                    width="300px"
                    inputValue={hookCollections?.$collectionName}
                    onChange={(e: any) => {
                      let collectionName = e.target.value;
                      // console.log(hookCollections.$coll);
                      hookCollections.$loadCollectionName(collectionName);
                    }}
                  />
                  <InputLabel
                    placeholder="Contract Address"
                    marginBottom={style.margin.sm}
                    label="Contract Address"
                    width="300px"
                    inputValue={hookCollections?.$collectionContractAddress}
                    onChange={(e: any) => {
                      let collectionContractAddress = e.target.value;
                      hookCollections.$loadCollectionContractAddress(
                        collectionContractAddress
                      );
                    }}
                  />
                  <InputLabel
                    placeholder="Chain ID"
                    marginBottom={style.margin.sm}
                    label="Chain ID"
                    width="300px"
                    inputValue={hookCollections?.$collectoinChainID}
                    onChange={(e: any) => {
                      let chainId = e.target.value;
                      hookCollections.$loadCollectionChainID(chainId);
                    }}
                  />
                  <InputLabel
                    placeholder="Network"
                    label=" Network"
                    width="300px"
                    inputValue={hookCollections?.$collectionNetwork}
                    onChange={(e: any) => {
                      let network = e.target.value;
                      hookCollections.$loadCollectionNetwork(network);
                    }}
                  />
                </FlexColumn>
              </>
            }
            footer={
              <FlexRow hrAlign="center">
                <div>
                  <ButtonNative
                    // variant="dark"
                    marginRight="sm"
                    onClick={closeCollectionModal}
                    width="100px"
                  >
                    Cancel
                  </ButtonNative>
                  <ButtonNative
                    variant="dark"
                    onClick={() => {
                      hookCollections.newCollection();
                    }}
                    width="100px"
                  >
                    Create
                  </ButtonNative>
                </div>
              </FlexRow>
            }
          />
        </>
      }
    />
  );
}
