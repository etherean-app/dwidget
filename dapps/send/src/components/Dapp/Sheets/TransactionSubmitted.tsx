import { Sheet, ListItem } from "@dwidget/shared-dapp/components";

import { useStateMachine } from "@/providers/stateMachine";
import { Button } from "../../common/Button";
import {
  ListItemAccount,
  ListItemNetwork,
  ListItemRecepient,
  ListItemAmount,
} from "./components";

export const TransactionSubmitted = () => {
  const [state, send] = useStateMachine();

  const open = state.matches("TRANSACTION_SUBMITTED");

  return (
    <Sheet
      open={open}
      onClose={() => open && send("back")}
      icon="done"
      title="Transaction submitted"
    >
      <div className="grid gap-1">
        <ListItemNetwork network={state.context.network} />
        <ListItemAccount address={state.context.address} />
        <ListItem label="ERC-20" value="Gas fee 25$" notImplemented />
        <ListItemAmount
          amount={state.context.amount}
          token={state.context.token}
          notImplemented
        />
        <ListItem label="Recipient gets" value="0.0556ETH" notImplemented />
        <ListItemRecepient recepient={state.context.recepient} />
      </div>
      <div className="grid gap-4 mt-4" onClick={() => send("back")}>
        <Button>Continue</Button>
      </div>
    </Sheet>
  );
};
