"use client";

import Text from "@/_ui/text/Text";
import useAuth from "@/hooks/useAuth";
import useUserAPI from "@/hooks/useUserAPI";
import { fetchBalance } from "@/services/ApiService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  let token: any;
  const hookAuth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (searchParams) {
      token = searchParams.get("token");
      if (token) {
        // console.log(token);
        localStorage.setItem("accessToken", token);
        fetchBalance()
          .then((res) => {
            // console.log(res);
            if (res.ok == true) {
              router.push("/");
            } else {
              localStorage.removeItem("accessToken");
              toast.error(res.error.message);
            }
          })
          .catch((err) => {
            // console.log(err);
            toast.error("Something went wrong, please try again");
          });
      }
    }
  }, [searchParams]);
  return (
    <>
      <Text>Loading...</Text>
    </>
  );
}
