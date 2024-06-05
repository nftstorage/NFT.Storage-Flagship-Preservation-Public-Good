"use client";
import React, { useEffect, useState } from "react";
import style from "@/styles/GlobalConstants";
import FlexColumn from "@/_ui/flex/FlexColumn";
import Text from "@/_ui/text/Text";
import FlexRow from "@/_ui/flex/FlexRow";
import InputLabel from "@/_ui/input/InputLabel";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import TableNative from "@/_ui/table/TableNative";
import Modal from "@/_ui/modal/Modal";
import IconBase from "@/_ui/icons/IconBase";
import InputCopy from "@/_ui/input/InputCopy";
import useUserAPI from "@/hooks/useUserAPI";
import { fetchApi } from "@/services/ApiService";
import toast from "react-hot-toast";

const Api = () => {
  const [generateApiModal, setGenerateApiModal] = useState<boolean>(false);

  const hookUserApi = useUserAPI();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchApis();
  }, []);

  const fetchApis = async () => {
    const res = await fetchApi();
    // console.log(res.value);
    hookUserApi.$loadApiUser(res.value);
    setIsLoading(false);
  };

  const columnsapi: any = [
    { key: "keyName", header: "Name" },
    { key: "createdAt", header: "Created At" },
    { key: "lastUsed", header: "Last Used" },
    { key: "action", header: "" },
  ];

  const openApiModal = () => {
    setGenerateApiModal(true);
  };

  const closeApiModal = () => {
    fetchApis();
    setGenerateApiModal(false);
  };

  const downloadApiKey = () => {
    const apiKeyContent = hookUserApi.$apiKey;
    const blob = new Blob([apiKeyContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "api_key.txt";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    toast.success("API key downloaded");
  };

  return (
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
              <FlexRow width="fit-content" marginBottom={"xs"}>
                <Text
                  fontSize={style.font.h3}
                  marginRight={style.margin.xxs}
                  fontFamily="ChicagoFLF"
                >
                  API keys
                </Text>
                <div
                  style={{
                    background: style.color.lightSecondry,
                    border: "1px solid #F5C32C",
                    padding: style.padding.xxxs,
                  }}
                >
                  <Text fontSize={style.font.h6}>
                    {hookUserApi.$apiUser?.length
                      ? hookUserApi.$apiUser?.length
                      : "0"}
                  </Text>
                </div>
              </FlexRow>

              <FlexRow height="fit-content" hrAlign="flex-start">
                <InputLabel
                  placeholder="Add name to generate key"
                  width="20%"
                  marginRight={style.margin.sm}
                  inputValue={hookUserApi.$apiName}
                  onChange={(e: any) => {
                    let apiName = e.target.value;
                    hookUserApi.$loadApiName(apiName);
                  }}
                />
                <ButtonNative
                  variant="dark"
                  onClick={() => {
                    if (hookUserApi.$apiName == "") {
                      toast.error("Please enter the Key Name");
                      return;
                    }
                    hookUserApi
                      .createAPI(hookUserApi.$apiName, "user")
                      .then((res) => {
                        // console.log("from page", res);
                        openApiModal();
                      })
                      .catch((error) => {
                        console.error("Error generating API key:", error);
                      })
                      .finally(() => {
                        hookUserApi.$loadApiName("");
                      });
                  }}
                  width="fit-content"
                  iconLeft={{ slug: "icon-settings-gear" }}
                  text="Generate Key"
                />
              </FlexRow>
            </FlexColumn>
          </div>
          {isLoading ? (
            <FlexColumn>
              <IconBase slug="spining-loader" size="3xl" />
            </FlexColumn>
          ) : (
            <>
              {hookUserApi.$apiUser?.length ? (
                <FlexColumn hrAlign="flex-start">
                  <TableNative
                    data={hookUserApi.$apiUser}
                    columns={columnsapi}
                  />
                </FlexColumn>
              ) : (
                <FlexColumn width="fit-content">
                  <IconBase slug="icon-noToken" size="5xl" />
                  <Text
                    align="center"
                    fontSize={style.font.h3}
                    marginBottom={style.margin.sm}
                    marginTop={style.margin.sm}
                    fontFamily="ChicagoFLF"
                  >
                    Generate first API key!
                  </Text>

                  <FlexColumn height="fit-content" hrAlign="flex-start">
                    <InputLabel
                      placeholder="Add name to generate key"
                      width="90%"
                      inputValue={hookUserApi.$apiName}
                      onChange={(e: any) => {
                        let apiName = e.target.value;
                        hookUserApi.$loadApiName(apiName);
                      }}
                    />
                    <ButtonNative
                      hrAlign={"center"}
                      marginTop="sm"
                      variant="dark"
                      onClick={() => {
                        hookUserApi
                          .createAPI(hookUserApi.$apiName, "user")
                          .then((res) => {
                            // console.log("from page", res);
                            openApiModal();
                          })
                          .catch((error) => {
                            console.error("Error generating API key:", error);
                          });
                      }}
                      width="90%"
                      iconLeft={{ slug: "icon-settings-gear" }}
                      text="Generate Key"
                    />
                  </FlexColumn>
                </FlexColumn>
              )}
            </>
          )}
        </FlexColumn>
      </div>
      <Modal
        isOpen={generateApiModal}
        onClose={closeApiModal}
        size="md"
        body={
          <>
            <FlexColumn>
              <FlexRow width="fit-content" marginBottom={"sm"}>
                <IconBase slug="icon-colored-check" size="xl" />
                <Text
                  marginLeft={style.margin.xxs}
                  fontSize={style.font.h3}
                  fontFamily="ChicagoFLF"
                >
                  API key has been created.
                </Text>
              </FlexRow>

              <InputCopy
                value={hookUserApi.$apiKey}
                paddingLeft={style.margin.sm}
              />
              <div
                style={{
                  background: style.color.lightSecondry,
                  padding: style.padding.sm,
                  marginTop: style.margin.sm,
                  display: "flex",
                }}
              >
                <IconBase slug="icon-colored-info" />
                <div>
                  <Text
                    fontSize={style.font.h7}
                    color={style.color.textPrimary}
                    marginLeft={style.margin.xxs}
                  >
                    Once the key is generated, it cannot be retrieved later. You
                    can either download the key file or write it down and store
                    it securely.
                  </Text>
                  <Text
                    fontSize={style.font.h7}
                    color={style.color.textPrimary}
                    marginLeft={style.margin.xxs}
                    marginTop={style.margin.xxs}
                  >
                    This API key will only work for this version of NFT.Storage
                    and the HTTP API that is accessible via the{" "}
                    <a
                      style={{ textDecoration: "underline" }}
                      href="https://app.nft.storage/v1/docs/client/http-api"
                    >
                      documentation here.
                    </a>
                  </Text>
                </div>
              </div>
            </FlexColumn>
          </>
        }
        footer={
          <FlexRow hrAlign="center">
            <ButtonNative
              // variant="dark"
              marginRight="sm"
              onClick={() => {
                navigator.clipboard.writeText(hookUserApi.$apiKey);
                toast.success("Copied to clipboard");
                closeApiModal();
              }}
              width="fit-content"
              text="Copy to clipboard"
              height="3rem"
            />
            <ButtonNative
              variant="dark"
              onClick={downloadApiKey}
              width="fit-content"
              iconLeft={{ slug: "icon-circle-download" }}
              text="Download key"
              height="3rem"
            />
          </FlexRow>
        }
      />
    </>
  );
};

export default Api;
