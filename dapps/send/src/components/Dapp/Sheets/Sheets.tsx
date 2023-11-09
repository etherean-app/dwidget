import { SendToken } from "./SendToken";
import { TransactionDetails } from "./TransactionDetails";
import { TransactionPreview } from "./TransactionPreview";
import { TransactionSubmitted } from "./TransactionSubmitted";

export const Sheets = () => {
  return (
    <>
      <SendToken />
      <TransactionDetails />
      <TransactionPreview />
      <TransactionSubmitted />
    </>
  );
};
