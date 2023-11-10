import { Button } from "../../common/Button";
import { useStateMachine } from "@/providers/stateMachine";
import {
  Sheet,
  ListItem,
  ListItemToken,
  ListItemAccount,
  ListItemNetwork,
  ListItemRecepient,
} from "./components";

export const TransactionDetails = () => {
  const [state, send] = useStateMachine();

  const open = state.matches("SEND_TOKEN.TRANSACTION_DETAILS");

  return (
    <Sheet
      open={open}
      onClose={() => open && send({ type: "back" })}
      icon="settings_ethernet"
      title="Transaction details"
    >
      <div className="grid gap-1">
        <ListItemNetwork
          network={state.context.network}
          onClick={() => send({ type: "network" })}
        />
        <ListItemAccount />
        <ListItem label="ERC-20" value="Gas fee 25$" />
        <ListItemToken
          token={state.context.token}
          onClick={() => send({ type: "token" })}
        />
        <ListItem label="Recipient gets" value="0.0556ETH" />
        <ListItemRecepient
          recepient={state.context.recepient}
          onClick={() => send({ type: "recepient" })}
        />
      </div>
      <div className="grid gap-4 mt-4" onClick={() => send({ type: "back" })}>
        <Button>Continue</Button>
      </div>
    </Sheet>
  );
};
