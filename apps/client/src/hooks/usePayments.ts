import { fetchTransactions } from "@/services/ApiService";
import usePaymentStore from "@/store/usePaymentStore";

const usePayments = () => {
  const $userTransactions = usePaymentStore(
    (state: any) => state.userTransactions
  );
  const $loadUserTransactions = usePaymentStore(
    (state: any) => state.loadUserTransactions
  );

  const fetchAllTransactions = () => {
    fetchTransactions().then((res) => {
      // console.log(res.value, " user txns");
      $loadUserTransactions(res?.value);
    });
  };
  return { fetchAllTransactions, $userTransactions, $loadUserTransactions };
};
export default usePayments;
