import { useSendTransaction, usePrepareSendTransaction } from "wagmi";
import { parseEther } from "viem";

import { useStateMachine } from "@/providers/stateMachine";
import { Button } from "../../common/Button";
import {
  Sheet,
  ListItem,
  ListItemAccount,
  ListItemNetwork,
  ListItemRecepient,
} from "./components";

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
      open={open}
      onClose={() => open && send("back")}
      icon="layers"
      title="Transaction preview"
    >
      <div className="grid gap-1">
        <ListItemNetwork network={state.context.network} />
        <ListItemAccount />
        <ListItem label="ERC-20" value="Gas fee 25$" />
        <ListItem label="Amount" value="0.057 ETH" />
        <ListItem label="Recipient gets" value="0.0556ETH" />
        <ListItemRecepient recepient={state.context.recepient} />
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
