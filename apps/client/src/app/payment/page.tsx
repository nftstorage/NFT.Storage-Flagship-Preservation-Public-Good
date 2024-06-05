"use client";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import FlexWindow from "@/_ui/flex/FlexWindow";
import IconBase from "@/_ui/icons/IconBase";
import NavLeft from "@/_ui/nav/NavLeft";
import Text from "@/_ui/text/Text";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "@/styles/GlobalConstants";

export default function Payment() {
  const [status, setStatus] = useState<boolean>();

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("message") == "success") {
      setStatus(true);
    } else if (searchParams.get("message") == "failure") {
      setStatus(false);
    }
  });
  return (
    <FlexWindow
      view="col"
      bodyElem={
        <>
          {status == true && (
            <FlexColumn height="100vh">
              <FlexColumn width="fit-content">
                <FlexRow height="fit-content" marginBottom="xxs">
                  <IconBase slug="icon-colored-check" size="xl" />
                  <Text fontSize={style.font.h4} marginLeft={style.margin.xxs}>
                    Congratulations
                  </Text>
                </FlexRow>
                <Text fontSize={style.font.h5}>Storage Updated</Text>
                <ButtonNative
                  marginTop="xxs"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Back to dashboard
                </ButtonNative>
              </FlexColumn>
            </FlexColumn>
          )}
          {status == false && (
            <FlexColumn height="100vh">
              <FlexColumn width="fit-content">
                <FlexRow height="fit-content" marginBottom="xxs">
                  {/* <IconBase slug="icon-colored-check" size="xl" /> */}
                  <Text fontSize={style.font.h4} marginLeft={style.margin.xxs}>
                    Oops
                  </Text>
                </FlexRow>
                <Text fontSize={style.font.h5}>
                  Something went wrong, Please try again
                </Text>
                <ButtonNative
                  marginTop="xxs"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Back to dashboard
                </ButtonNative>
              </FlexColumn>
            </FlexColumn>
          )}
        </>
      }
    />
  );
}
