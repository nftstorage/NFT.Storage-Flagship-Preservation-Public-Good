"use client";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import Checkbox from "@/_ui/checkbox/Checkbox";
import Divider from "@/_ui/divider/Divider";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconBase";
import InputLabel from "@/_ui/input/InputLabel";
import Text from "@/_ui/text/Text";
import { config } from "@/config";
import useAuth from "@/hooks/useAuth";
import GlobalAssets from "@/styles/GlobalAssets";
import style from "@/styles/GlobalConstants";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignupContainer({ text }: any) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fetchToken = async () => {
    const token = await fetch(
      `${config.server}/api/v1/auth/oauth/github?code=${searchParams.get("code")}&emailOpt=${localStorage.getItem("emailOpt")}`
    );
    const tokenvalue = await token.json();
    // console.log(tokenvalue);
    if (tokenvalue.ok == true) {
      localStorage.setItem("accessToken", tokenvalue.value.accessToken);
      router.push("/");
    } else {
      toast.error(tokenvalue.error.message);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      if (searchParams.get("code")) {
        const token = await fetchToken();
      }
    };
    fetch();
  }, [searchParams]);
  useEffect(() => {
    // console.log("emailOpt", localStorage.getItem("emailOpt"));
    if (!localStorage.getItem("emailOpt")) {
      localStorage.setItem("emailOpt", "true");
    }
  }, []);

  const hookAuth = useAuth();
  // const [isChecked, setIsChecked] = useState(false);
  const [isCheckedMarketing, setIsCheckedMarketing] = useState(true);

  const handleCheckboxChange = (isChecked: boolean) => {
    setIsCheckedMarketing(isChecked);
    localStorage.setItem("emailOpt", isChecked.toString());
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        height: "100vh",
        justifyContent: "space-between",
        zIndex: "-1",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ height: "8%" }}></div>
      <FlexColumn vrAlign="flex-start" width="50%" height="fit-content">
        <img
          src={GlobalAssets["logo-nftstorage"]}
          style={{ marginBottom: `${style.margin.xl}` }}
        />
        <Text fontSize={style.font.h3} fontFamily="ChicagoFLF">
          {text}
        </Text>
        {/* <Text>A descriptive body text comes here.</Text> */}
        {/* <InputLabel
          type={"email"}
          marginTop={style.margin.sm}
          marginBottom={style.margin.sm}
          placeholder="Enter your email"
          width="100%"
          inputValue={hookAuth?.$userEmail}
          onChange={(e: any) => {
            let userEmail = e.target.value;
            hookAuth.$loadUserEmail(userEmail);
          }}
        /> */}
        {/* {text == "Signup" && (
          
        )} */}

        {/* <ButtonNative
          variant="dark"
          onClick={() => {
            text == "Signup"
              ? hookAuth.signup(hookAuth.$userEmail, isChecked)
              : hookAuth.login(hookAuth?.$userEmail);
          }}
          text={text == "Signup" ? "Get magic link" : "Log in"}
          hrAlign={"center"}
        ></ButtonNative> */}
        {/* <Divider
          text="OR"
          marginTop={style.margin.sm}
          marginBottom={style.margin.sm}
        /> */}
        {text == "Signup" ? (
          <Checkbox
            marginTop={style.margin.sm}
            checked={isCheckedMarketing}
            onChange={handleCheckboxChange}
          >
            <Text>Opt in for marketing emails</Text>
          </Checkbox>
        ) : null}
        <ButtonNative
          marginTop="sm"
          onClick={() => {
            try {
              window.open(
                `https://github.com/login/oauth/authorize?client_id=${config.githubClientID}`
              );
            } catch (error) {
              console.error("Error in github login", error);
            }
          }}
        >
          <FlexRow hrAlign="center" vrAlign="center">
            <img src={GlobalAssets["icon-github"]} />
            <Text marginLeft={style.margin.xxs} fontSize={style.font.h6}>
              {text == "Signup" ? "Sign up with github" : "Log in with github"}
            </Text>
          </FlexRow>
        </ButtonNative>
        <FlexColumn height="fit-content">
          <Text
            marginBottom={style.margin.xl}
            marginTop={style.margin.xl}
            color={style.color.dullText}
            // fontFamily="ChicagoFLF"
          >
            {text == "Signup" ? (
              <>
                Already have an account?
                <span
                  style={{
                    marginLeft: style.margin.xxs,
                    color: "#000",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Log in
                </span>
              </>
            ) : (
              <>
                Don’t have an account?
                <span
                  style={{
                    marginLeft: style.margin.xxs,
                    color: "#000",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    router.push("/signup");
                  }}
                >
                  Sign up
                </span>
              </>
            )}
          </Text>
          <div
            style={{
              background: style.color.lightSecondry,
              padding: style.padding.xxs,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <FlexRow width="fit-content">
              <IconBase slug="icon-colored-info" size="xxs" />
              <Text
                fontSize={style.font.h7}
                color={style.color.textPrimary}
                marginLeft={style.margin.xxs}
              >
                Have a Classic NFT.Storage account?
              </Text>
            </FlexRow>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.open("https://classic.nft.storage/login/", "_blank");
              }}
            >
              <Text fontSize={style.font.h7} color="#000">
                Log in here
              </Text>
            </div>
          </div>
        </FlexColumn>
      </FlexColumn>
      <FlexRow height="8%">
        <Text
          marginRight={style.margin.sm}
          color={style.color.dullText}
          fontSize={style.font.h7}
        >
          <a href="https://nft.storage/terms/">Terms of Service</a>
        </Text>
        <Text color={style.color.dullText} fontSize={style.font.h7}>
          <a href="https://nft.storage/privacy/">Privacy Policy</a>
        </Text>
      </FlexRow>
    </div>
  );
}
