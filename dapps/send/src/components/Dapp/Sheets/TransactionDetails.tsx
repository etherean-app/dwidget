import { Sheet, Button, ListItem } from "@dwidget/shared-dapp/components";

import { useStateMachineRef, useStateMachineSelector } from "@/providers";
import {
  ListItemToken,
  ListItemAccount,
  ListItemNetwork,
  ListItemRecepient,
} from "./components";

export const TransactionDetails = () => {
  const { send } = useStateMachineRef();

  const open = useStateMachineSelector((state) =>
    state.matches("SEND_TOKEN.TRANSACTION_DETAILS")
  );

  const { network, address, token, recepient } = useStateMachineSelector(
    (state) => ({
      network: state.context.network,
      address: state.context.address,
      token: state.context.token,
      recepient: state.context.recepient,
    })
  );

  return (
    <Sheet
      open={open}
      onClose={() => open && send({ type: "back" })}
      icon="settings_ethernet"
      title="Transaction details"
    >
      <div className="grid gap-1">
        <ListItemNetwork
          network={network}
          onClick={() => send({ type: "network" })}
        />
        <ListItemAccount address={address} />
        <ListItem label="ERC-20" value="Gas fee 25$" notImplemented />
        <ListItemToken token={token} onClick={() => send({ type: "token" })} />
        <ListItem label="Recipient gets" value="0.0556ETH" notImplemented />
        <ListItemRecepient
          recepient={recepient}
          onClick={() => send({ type: "recepient" })}
        />
      </div>
      <div className="grid gap-4 mt-4" onClick={() => send({ type: "back" })}>
        <Button>Continue</Button>
      </div>
    </Sheet>
  );
};
