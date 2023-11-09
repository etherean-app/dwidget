import { ListItem } from "./components/ListItem";
import { Button } from "../../common/Button";
import { Sheet } from "./components/Sheet";
import { useStateMachine } from "@/providers/stateMachine";
import { ListItemAccount } from "./components/ListItemAccount";

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
        <ListItem label="Network" value={state.context.network} />
        <ListItemAccount />
        <ListItem label="ERC-20" value="Gas fee 25$" />
        <ListItem label="Amount" value="0.057 ETH" />
        <ListItem label="Recipient gets" value="0.0556ETH" />
        <ListItem label="Recepient" value="0x3fC6...7FA6gD" />
      </div>
      <div className="grid gap-4 mt-4" onClick={() => send("back")}>
        <Button>Continue</Button>
      </div>
    </Sheet>
  );
};
