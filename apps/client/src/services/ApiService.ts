import { config } from "@/config";
import toast from "react-hot-toast";

export const register = async (emailId: string, isChecked?: boolean) => {
  try {
    const response = await fetch(
      `${config.server}/api/v1/auth/register?email=${emailId}&marketingEmail=${isChecked}`
    );
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    // console.log("error ", error);
    return error;
  }
};
export const loginOn = async (emailId: string) => {
  try {
    const response = await fetch(
      `${config.server}/api/v1/auth/login?email=${emailId}`
    );
    if (response.status == 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(await response.text());
    }
  } catch (error: any) {
    // console.log("error ", error);
    return error;
  }
};
export const verify = async (token: string) => {
  try {
    const response = await fetch(
      `${config.server}/api/v1/auth/verify?verification_token=${token}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log("error ", error);
    return error;
  }
};
export const createApiKey = async (keyName: string, role: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found in local storage");
    }
    const response = await fetch(
      `${config.server}/api/v1/auth/create_api_key?keyName=${keyName}&role=${role}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log("error ", error);
    return error;
  }
};
export const deleteAPIkey = async (keyID: any) => {
  try {
    // console.log(keyID);
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found in local storage");
    }
    const response = await fetch(
      `${config.server}/api/v1/auth/remove_api_key?keyID=${keyID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log("error ", error);
    return error;
  }
};
export const tokenUpload = async (formData: any) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found in local storage");
    }
    const response = await fetch(
      `${config.server}/api/v1/collection/add_tokens`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    // console.log("error ", error);
    return error;
  }
};
export const listCollections = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found in local storage");
    }
    const response = await fetch(
      `${config.server}/api/v1/collection/list_collections`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    return data.value || [];
  } catch (error) {
    // console.log("error in listCollections", error);
    return error;
  }
};
export const viewCollection = async (collectionID: any) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found in local storage");
    }
    const response = await fetch(
      `${config.server}/api/v1/collection/list_tokens?collectionID=${collectionID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log("error in viewCollection", error);
    return error;
  }
};
export const createCollection = async (collectionData: any) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found in local storage");
    }
    // console.log(collectionData, "collectionData");
    var formBody: any = [];
    for (var property in collectionData) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(collectionData[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const response = await fetch(
      `${config.server}/api/v1/collection/create_collection`,
      {
        method: "POST",
        body: formBody,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log("error in listCollections", error);
    return error;
  }
};
export const fetchApi = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found in local storage");
    }
    const response = await fetch(`${config.server}/api/v1/auth/list_api_keys`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log("error in fetchapis", error);
    return error;
  }
};
export const fetchBalance = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found in local storage");
    }
    const response = await fetch(`${config.server}/api/v1/user/get_balance`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    // console.log("error in fetchBalance", error);
    return error;
  }
};
export const fetchPaymentUrl = async (dataCap: any) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found in local storage");
    }
    const response = await fetch(
      `${config.server}/api/v1/payment/initiate_stripe_transaction?dataCap=${dataCap}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status == 200) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch (error) {
    // console.log("error in fetchPaymentUrl", error);
    return error;
  }
};
export const fetchTransactions = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found in local storage");
    }
    const response = await fetch(
      `${config.server}/api/v1/payment/list_all_transaction`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status == 200) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch (error) {
    // console.log("error in fetchtransactions", error);
    return error;
  }
};
export const fetchDealID = async (cid: string) => {
  try {
    const response = await fetch(
      `https://api.lighthouse.storage/api/lighthouse/deal_status?cid=${cid}`,
      {
        method: "GET",
      }
    );
    if (response.status == 200) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch (error) {
    // console.log("error in fetchDealID", error);
    return error;
  }
};
