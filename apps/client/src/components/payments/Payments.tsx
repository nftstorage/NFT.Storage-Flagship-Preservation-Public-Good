"use client";

import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconBase";
import InputLabel from "@/_ui/input/InputLabel";
import TableNative from "@/_ui/table/TableNative";
import Text from "@/_ui/text/Text";
import usePayments from "@/hooks/usePayments";
import { fetchPaymentUrl } from "@/services/ApiService";
import style from "@/styles/GlobalConstants";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Payments = () => {
  const [dataCap, setDataCap] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const hookPayments = usePayments();
  const router = useRouter();

  useEffect(() => {
    hookPayments.fetchAllTransactions();
  }, []);

  const handleDataCapChange = (event: any) => {
    const amount = parseFloat(event.target.value);
    setDataCap(amount);
    setTotalPrice(amount * 2.99);
  };

  const columnspayment: any = [
    { key: "txID", header: "Transaction ID" },
    { key: "status", header: "Status" },
    { key: "amount", header: "Amount" },
  ];

  return (
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
        <FlexColumn width="fit-content">
          <Text
            align="center"
            fontSize={style.font.h2}
            marginBottom={style.margin.sm}
            fontFamily="chicagoflf"
          >
            Get more storage
          </Text>
          <FlexRow hrAlign="space-between" height="fit-content">
            <Text
              align="center"
              fontSize={style.font.h6}
              marginBottom={style.margin.xxs}
              color="#667085"
              fontFamily="SourceSansPro"
            >
              Price Per GB
            </Text>
            <Text
              align="center"
              fontSize={style.font.h6}
              marginBottom={style.margin.xxs}
              fontFamily="SourceSansPro"
            >
              $2.99
            </Text>
          </FlexRow>
          <FlexRow height="fit-content" hrAlign="space-between">
            <Text
              align="center"
              fontSize={style.font.h6}
              marginRight={style.margin.sm}
              color="#667085"
              fontFamily="SourceSansPro"
            >
              Enter GB Amount:
            </Text>
            <InputLabel
              type={"number"}
              placeholder="Enter GB to buy"
              width="20%"
              inputValue={dataCap}
              onChange={handleDataCapChange}
            />
          </FlexRow>

          <div
            style={{
              background: style.color.bgGreen,
              width: "100%",
              marginTop: style.margin.xxs,
              paddingTop: style.padding.xxs,
              paddingBottom: style.padding.xxs,
            }}
          >
            <FlexRow height="fit-content" hrAlign="space-between">
              <Text
                align="center"
                fontSize={style.font.h6}
                marginLeft={style.margin.sm}
                fontFamily="SourceSansPro"
                color={style.color.textGreen}
              >
                Total price:
              </Text>
              <Text
                align="center"
                fontSize={style.font.h6}
                marginRight={style.margin.sm}
                fontFamily="SourceSansPro"
              >
                ${totalPrice ? totalPrice.toFixed(2) : 0}
              </Text>
            </FlexRow>
          </div>
          <FlexRow height="fit-content" hrAlign="flex-start">
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
                  width="300px"
                  marginTop="-2px"
                >
                  Storage purchased is used for this version of NFT.Storage and
                  the associated API. Do not purchase storage to use NFT.Storage
                  Classic API or NFTUp.
                </Text>
              </div>
            </div>
          </FlexRow>
          <ButtonNative
            marginTop="sm"
            variant="dark"
            width="fit-content"
            onClick={async () => {
              setIsLoading(true);
              if (dataCap == 0) {
                toast("Please increase datacap");
              } else {
                const paymentURL = await fetchPaymentUrl(dataCap);
                if (paymentURL) {
                  router.push(`${paymentURL.value.url}`);
                } else {
                  toast.error("Something went wrong");
                }
              }
              setIsLoading(false);
            }}
          >
            Purchase now
          </ButtonNative>
        </FlexColumn>
        {/* <FlexColumn>
          {hookPayments.$userTransactions.length ? (
            <TableNative
              data={hookPayments.$userTransactions}
              columns={columnspayment}
            />
          ) : (
            <></>
          )}
        </FlexColumn> */}
      </FlexColumn>
    </div>
  );
};

export default Payments;
