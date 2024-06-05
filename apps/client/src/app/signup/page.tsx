"use client";
import AuthContainer from "@/containers/AuthContainer/AuthContainer";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUp() {
  const router = useRouter();
  useEffect(() => {
    if (window != undefined) {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const tokenPayload: any = jwtDecode(accessToken);
        if (tokenPayload) {
          const expirationTime = tokenPayload?.exp * 1000;
          if (Date.now() < expirationTime) {
            router.push("/");
          }
        }
      }
    }
  });
  return <AuthContainer process="Signup" />;
}
