import { ListItem } from "./components/ListItem";
import { Button } from "../../common/Button";
import { Sheet } from "./components/Sheet";
import { useStateMachine } from "@/providers/stateMachine";
import { ListItemToken } from "./components/ListItemToken";
import { ListItemAccount } from "./components/ListItemAccount";

export const TransactionDetails = () => {
  const [state, send] = useStateMachine();

  const open = state.matches("SEND_TOKEN.TRANSACTION_DETAILS");

  return (
    <Sheet
      open={open}
      onClose={() => open && send("back")}
      icon="settings_ethernet"
      title="Transaction details"
    >
      <div className="grid gap-1">
        <ListItem
          label="Network"
          value={state.context.network}
          onClick={() => send("network")}
        />
        <ListItemAccount />
        <ListItem label="ERC-20" value="Gas fee 25$" />
        <ListItemToken
          token={state.context.token}
          onClick={() => send("token")}
        />
        <ListItem label="Recipient gets" value="0.0556ETH" />
        <ListItem
          label="Recepient"
          value="0x3fC6...7FA6gD"
          onClick={() => send("recepient")}
        />
      </div>
      <div className="grid gap-4 mt-4" onClick={() => send("back")}>
        <Button>Continue</Button>
      </div>
    </Sheet>
  );
};
