import { useStateMachine } from "@/providers/stateMachine";
import { ListItem } from "./components/ListItem";
import { Button } from "../../common/Button";
import { Sheet } from "./components/Sheet";
import { ListItemToken } from "./components/ListItemToken";
import { ListItemAccount } from "./components/ListItemAccount";

export const SendToken = () => {
  const [state, send] = useStateMachine();

  const open = state.matches("SEND_TOKEN.SEND_TOKEN");

  return (
    <Sheet
      open={open}
      onClose={() => open && send("send")}
      icon="settings_ethernet"
      title="Send token"
    >
      <div className="grid gap-1">
        <ListItemToken
          token={state.context.token}
          onClick={() => send("token")}
        />
        <ListItem
          label="Network"
          value={state.context.network}
          onClick={() => send("network")}
        />
        <ListItemAccount label="Account" />
        <ListItem
          label="Recepient"
          value="0x3fC...7FAD"
          onClick={() => send("recepient")}
        />
      </div>
      <div className="grid gap-4 mt-10">
        <Button onClick={() => send("send")}>Continue</Button>
        <Button color="hollow">Cancel</Button>
      </div>
    </Sheet>
  );
};
