"use client";

import style from "@/styles/GlobalConstants";
import SignupContainer from "../SignupContainer/SignupContainer";
import GlobalAssets from "@/styles/GlobalAssets";
import Text from "@/_ui/text/Text";
import FlexRow from "@/_ui/flex/FlexRow";
import useAuth from "@/hooks/useAuth";
import Loader from "@/_ui/loader/Loader";
import { useEffect, useState } from "react";

interface AuthContainer {
  process?: string;
}

export default function AuthContainer({ process }: AuthContainer) {
  const hookAuth = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(
    hookAuth.isLoading || false
  );
  useEffect(() => {
    // console.log(hookAuth.isLoading);
    setIsLoading(hookAuth.isLoading || false);
  }, [hookAuth.isLoading]);
  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      {isLoading && <Loader />}
      <div
        style={{
          height: "100vh",
          position: "fixed",
          left: "0",
          width: "60%",
          background: `${style.color.secondary}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignupContainer text={process} />
      </div>
      <div
        style={{
          marginLeft: `60%`,
          width: "40%",
          height: "100vh",
          background: `${style.color.primary}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src={GlobalAssets["auth-side"]}
          style={{ objectFit: "contain" }}
          width={"100%"}
        />
        <div
          style={{
            width: "100%",
            padding: `${style.padding.xxxl} ${style.padding.xxl} ${style.padding.xxxl} ${style.padding.xxl}`,
          }}
        >
          <Text
            fontSize={style.font.h4}
            marginBottom={style.margin.lg}
            fontFamily="chicagoflf"
          >
            The NFT.Storage team is trusted by these top companies and over{" "}
            <span style={{ color: "white" }}>165,000+</span> users
          </Text>
          <div
            style={{
              background: `${style.color.darkSecondary}`,
              padding: `${style.margin.xxs} ${style.margin.md} ${style.margin.xxs} ${style.margin.md}`,
            }}
          >
            <FlexRow width="100%" height="fit-content" hrAlign="space-between">
              <img src={GlobalAssets["logo-openSea"]} width={"30%"} />
              <img src={GlobalAssets["logo-rarible"]} width={"30%"} />
              <img src={GlobalAssets["logo-tatum"]} width={"30%"} />
            </FlexRow>
          </div>
        </div>
      </div>
    </div>
  );
}
