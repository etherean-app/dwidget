import { Sheet, ListItem, Button } from "@dwidget/shared-dapp/components";

import { useStateMachineRef, useStateMachineSelector } from "@/providers";
import {
  ListItemAccount,
  ListItemNetwork,
  ListItemRecepient,
  ListItemAmount,
} from "./components";

export const TransactionSubmitted = () => {
  const { send } = useStateMachineRef();

  const open = useStateMachineSelector((state) =>
    state.matches("TRANSACTION_SUBMITTED")
  );

  const { network, address, amount, token, recepient } =
    useStateMachineSelector((state) => ({
      network: state.context.network,
      address: state.context.address,
      amount: state.context.amount,
      token: state.context.token,
      recepient: state.context.recepient,
    }));

  return (
    <Sheet
      open={open}
      onClose={() => open && send("back")}
      icon="done"
      title="Transaction submitted"
    >
      <div className="grid gap-1">
        <ListItemNetwork network={network} />
        <ListItemAccount address={address} />
        <ListItem label="ERC-20" value="Gas fee 25$" notImplemented />
        <ListItemAmount amount={amount} token={token} notImplemented />
        <ListItem label="Recipient gets" value="0.0556ETH" notImplemented />
        <ListItemRecepient recepient={recepient} />
      </div>
      <div className="grid gap-4 mt-4" onClick={() => send("back")}>
        <Button>Continue</Button>
      </div>
    </Sheet>
  );
};
