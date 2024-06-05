import React from "react";
import { config } from "@/config";
import style from "@/styles/GlobalConstants";
import FlexColumn from "@/_ui/flex/FlexColumn";
import Text from "@/_ui/text/Text";
import FlexRow from "@/_ui/flex/FlexRow";
import ButtonNative from "@/_ui/buttons/ButtonNative";
const Support = () => {
  return (
    <div
      style={{
        width: "100%",
        padding: "1.5rem",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `${style.color.secondary}`,
      }}
    >
      <FlexColumn hrAlign="center" vrAlign="center" width="500px">
        <Text fontSize={style.font.h3} fontFamily="chicagoflf">
          Get Support
        </Text>
        <Text
          align="center"
          color={style.color.dullText}
          marginBottom={style.margin.xxs}
          marginTop={style.margin.sm}
        >
          We’re here to help. View the docs to learn more about NFT.Storage
          features and how to use them. Or contact us to ask questions, report
          problems, or share feedback. For account related questions, email us
          at
        </Text>
        <a href="mailto:support@nft.storage">support@nft.storage</a>
        <FlexRow height="fit-content" marginTop={"sm"}>
          <ButtonNative
            hrAlign={"center"}
            width="fit-content"
            text="Visit docs"
            marginRight="sm"
            onClick={() => {
              window.open(
                config.docsURL,
                "_blank"
              );
            }}
          />
          <ButtonNative
            hrAlign={"center"}
            width="fit-content"
            text="Open a ticket"
            onClick={() => {
              window.open(
                "https://github.com/nftstorage/nft.storage/issues/new",
                "_blank"
              );
            }}
          />
        </FlexRow>
      </FlexColumn>
    </div>
  );
};

export default Support;
