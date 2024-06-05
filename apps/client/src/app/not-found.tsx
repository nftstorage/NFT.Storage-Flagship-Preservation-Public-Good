"use client";
import FlexColumn from "@/_ui/flex/FlexColumn";
import Text from "@/_ui/text/Text";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import style from "@/styles/GlobalConstants";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <FlexColumn padding="40px 0" height="100vh">
      <Text fontSize={style.font.h1} fontFamily="chicagoflf">
        404
      </Text>
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        style={{ height: "400px", backgroundPosition: "center" }}
      />
      <Text fontFamily="chicagoflf" fontSize={style.font.h3}>
        Look like you&apos;re lost
      </Text>
      <Text
        fontFamily="chicagoflf"
        marginBottom={style.margin.sm}
        marginTop={style.margin.sm}
      >
        the page you are looking for not avaible!
      </Text>
      <ButtonNative
        onClick={() => {
          router.push("/");
        }}
        text="Go to Dashboard"
        hrAlign={"center"}
        width="fit-content"
      />
    </FlexColumn>
  );
}
