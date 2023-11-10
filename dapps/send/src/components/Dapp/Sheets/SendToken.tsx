import { useStateMachine } from "@/providers/stateMachine";
import {
  Sheet,
  ListItemToken,
  ListItemAccount,
  ListItemNetwork,
  ListItemRecepient,
} from "./components";
import { Button } from "../../common/Button";

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
        <ListItemNetwork
          network={state.context.network}
          onClick={() => send("network")}
        />
        <ListItemAccount label="Account" />
        <ListItemRecepient
          recepient={state.context.recepient}
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
