import { FunctionalComponent } from "preact";
import { useStateMachine } from "@/providers/stateMachine";
import {
  ListItem,
  ListItemAccount,
  ListItemNetwork,
  ListItemRecepient,
  ListItemAmount,
} from "../../components";

interface Props {}

export const Details: FunctionalComponent<Props> = () => {
  const [state, send] = useStateMachine();

  return (
    <div className="grid gap-1">
      <ListItemNetwork
        network={state.context.network}
        onClick={() => send({ type: "network" })}
      />
      <ListItemAccount address={state.context.address} />
      <ListItem label="ERC-20" value="Gas fee 25$" notImplemented />
      <ListItemAmount
        amount={state.context.amount}
        token={state.context.token}
      />
      <ListItem label="Recipient gets" value="0.0556ETH" notImplemented />
      <ListItemRecepient
        recepient={state.context.recepient}
        onClick={() => send({ type: "recepient" })}
      />
    </div>
  );
};
