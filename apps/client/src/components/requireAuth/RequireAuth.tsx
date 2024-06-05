"use client";
import useAuthStore from "@/store/useAuthStore";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function RequireAuth({ children }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const $loadAccessToken = useAuthStore((state: any) => state.loadAccessToken);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    $loadAccessToken(accessToken);
    const isTokenValid = () => {
      if (typeof window !== "undefined") {
        if (accessToken && accessToken != "undefined") {
          const tokenPayload: any = jwtDecode(accessToken);
          if (tokenPayload) {
            // console.log(tokenPayload);
            const expirationTime = tokenPayload?.exp * 1000;
            return Date.now() < expirationTime;
          }
          return false;
        }
        return false;
      }
    };
    if (
      !isTokenValid() &&
      typeof window !== "undefined" &&
      pathname != "/login" &&
      pathname != "/signup" &&
      pathname != "/verify_email" &&
      pathname != "/v1/*" &&
      pathname != "/docs"
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.push("/login");
    }
  }, []);
  return children;
}

export default RequireAuth;
