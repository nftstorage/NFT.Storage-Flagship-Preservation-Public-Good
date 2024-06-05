import { register, verify, loginOn } from "@/services/ApiService";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConditions, setShowConditions] = useState<boolean>(false);
  const $userEmail = useAuthStore((state: any) => state.userEmail);
  const $loadUserEmail = useAuthStore((state: any) => state.loadUserEmail);
  const router = useRouter();

  const signup = async (emailId: string, isChecked?: boolean) => {
    try {
      toast.loading("Registering...");
      const response = await register(emailId, isChecked);
      if (response.status === 200) {
        toast.dismiss();
        toast.success("Successfully logged in!", {
          duration: 4000,
        });
      } else {
        toast.dismiss();
        toast.error(JSON.parse(response.message).error.message, {
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Error during login:", error);
    }
    // toast
    //   .promise(register(emailId, isChecked), {
    //     loading: "Registering...",
    //     success: (response) => {
    //       if (response.ok == true) {
    //         return response.value;
    //       } else {
    //         return response.error.message;
    //       }
    //     },
    //     error: (response) => response.error.message,
    //   })
    //   .then(() => {
    //     setIsLoading(false);
    //   });
  };
  const login = async (emailId: string) => {
    try {
      toast.loading("Logging in...");
      const response = await loginOn(emailId);
      if (response.status === 200) {
        toast.dismiss();
        toast.success(response.value, {
          duration: 4000,
        });
      } else {
        toast.dismiss();
        toast.error(JSON.parse(response.message).error.message, {
          duration: 4000,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Error during login:", error);
    }
  };

  const verifyEmail = (token: string) => {
    verify(token).then((res: any) => {
      // console.log(res);
      localStorage.setItem("accessToken", res.value.accessToken);
      router.push("/");
    });
  };
  return {
    isLoading: isLoading,
    setIsLoading,
    signup: signup,
    login: login,
    $userEmail,
    $loadUserEmail,
    verifyEmail,
    showConditions,
    setShowConditions,
  };
};

export default useAuth;
