"use client";
import { config } from "@/config";
import GlobalAssets from "@/styles/GlobalAssets";
import style from "@/styles/GlobalConstants";
import { useEffect, useState } from "react";
import ButtonNative from "../buttons/ButtonNative";
import FlexColumn from "../flex/FlexColumn";
import FlexRow from "../flex/FlexRow";
import ProgressBar from "../progressBar/ProgressBar";
import Text from "../text/Text";
import useUserAPI from "@/hooks/useUserAPI";
import { usePathname, useRouter } from "next/navigation";

const NavLeft = (props: any) => {
  const hookUserAPI = useUserAPI();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    hookUserAPI.fetchUserBalance();
    // Set active tab based on current URL
    // const path = window.location.pathname;
    // if (path === "/dashboard") {
    //   setActiveTab("Dashboard");
    // } else if (path === "/api") {
    //   setActiveTab("API Key");
    // }
  }, []);

  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleTabClick = (tab: string) => {
    if (pathname != "/") {
      router.push("/");
    }
    setActiveTab(tab);
    props?.tabChange(tab);
  };

  return (
    <>
      <FlexRow>
        <div
          style={{
            width: `${style.nav.widthLeft}`,
            zIndex: 100000,
            height: "100vh",
            position: "fixed",
            left: "0",
            background: `${style.color.secondary}`,
            borderRight: `${style.nav.border.light}`,
          }}
        >
          <div
            className="body"
            style={{ padding: `${style.margin.sm}`, height: "100%" }}
          >
            <FlexColumn hrAlign="space-between" vrAlign="center">
              <FlexColumn hrAlign="flex-start">
                <FlexColumn height="fit-content" vrAlign="flex-start">
                  <a href="/">
                    <img
                      width={"80%"}
                      src={GlobalAssets["logo-nftstorage"]}
                      style={{ marginBottom: `${style.margin.xl}` }}
                    />
                  </a>
                </FlexColumn>
                <div
                  style={{
                    width: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <FlexColumn height="fit-content" vrAlign="center">
                    <ButtonNative
                      text="Dashboard"
                      iconLeft={{ slug: "icon-dashboard", size: "sm" }}
                      onClick={() => handleTabClick("Dashboard")}
                      paddingTop="12px"
                      variant={
                        activeTab === "Dashboard" ? "active" : "transparent"
                      }
                      // borderColor="#000"
                    />
                    <ButtonNative
                      text="API Key"
                      iconLeft={{ slug: "icon-apiKey", size: "sm" }}
                      onClick={() => handleTabClick("API Key")}
                      paddingTop="12px"
                      variant={
                        activeTab === "API Key" ? "active" : "transparent"
                      }
                    />
                  </FlexColumn>
                </div>
              </FlexColumn>
              <FlexColumn hrAlign="flex-end">
                <FlexRow hrAlign="space-between" height="fit-content">
                  <Text fontSize={style.font.h8} fontWeight={"600"}>
                    {hookUserAPI?.$dataUsed.toFixed(2)}GB used
                  </Text>
                  <Text fontSize={style.font.h8} fontWeight={"600"}>
                    {hookUserAPI?.$dataLimit.toFixed(2) -
                      hookUserAPI?.$dataUsed.toFixed(2)}
                    /{hookUserAPI?.$dataLimit.toFixed(2)} left
                  </Text>
                </FlexRow>
                <ProgressBar
                  totalSpace={hookUserAPI.$dataLimit}
                  usedSpace={hookUserAPI.$dataUsed}
                />

                <ButtonNative
                  text="Get more storage"
                  variant="light"
                  className="side-nav-button"
                  onClick={() => handleTabClick("Payment")}
                  marginBottom="sm"
                  hrAlign={"center"}
                />
                <ButtonNative
                  text="Documentation"
                  iconLeft={{ slug: "icon-docs", size: "sm" }}
                  onClick={() => {
                    window.open(
                      config.docsURL,
                      "_blank"
                    );
                  }}
                  variant={activeTab === "Docs" ? "active" : "transparent"}
                  active={activeTab === "Docs"}
                  paddingTop="12px"
                />
                <ButtonNative
                  text="Support"
                  iconLeft={{ slug: "icon-support", size: "sm" }}
                  onClick={() => handleTabClick("Support")}
                  variant={activeTab === "Support" ? "active" : "transparent"}
                  paddingTop="12px"
                />
                <ButtonNative
                  text="Logout"
                  iconLeft={{ slug: "icon-logout", size: "sm" }}
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    router.push("/login");
                  }}
                  variant={"transparent"}
                  paddingTop="12px"
                />
              </FlexColumn>
            </FlexColumn>
          </div>
        </div>
      </FlexRow>
    </>
  );
};
export default NavLeft;
