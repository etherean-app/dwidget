import { useSendTransaction, usePrepareSendTransaction } from "wagmi";
import { parseEther } from "viem";

import { ListItem } from "./components/ListItem";
import { Button } from "../../common/Button";
import { Sheet } from "./components/Sheet";
import { useStateMachine } from "@/providers/stateMachine";

export const TransactionPreview = () => {
  const [state, send] = useStateMachine();

  const { config } = usePrepareSendTransaction({
    to: "moxey.eth",
    value: parseEther("0.01"),
  });
  const { data, isLoading, isSuccess, sendTransaction } =
    useSendTransaction(config);

  const open = state.matches("TRANSACTION_PREVIEW");

  return (
    <Sheet
      open={state.matches("TRANSACTION_PREVIEW")}
      onClose={() => open && send("back")}
      icon="layers"
      title="Transaction preview"
    >
      <div className="grid gap-1">
        <ListItem label="Network" value="Ethereum mainnet" />
        <ListItem label="From account" value="0x5h6H...45yf5T" />
        <ListItem label="ERC-20" value="Gas fee 25$" />
        <ListItem label="Amount" value="0.057 ETH" />
        <ListItem label="Recipient gets" value="0.0556ETH" />
        <ListItem label="Recepient" value="0x3fC6...7FA6gD" />
      </div>
      <div
        className="grid gap-4 mt-4"
        onClick={() => send("transactionSubmitted")}
      >
        <Button>Continue</Button>
      </div>
    </Sheet>
  );
};
