import { Sheet } from "@dwidget/shared-dapp/components";

import { useStateMachine } from "@/providers/stateMachine";
import {
  ListItemToken,
  ListItemAccount,
  ListItemNetwork,
  ListItemRecepient,
} from "./components";
import { Button } from "../../common/Button";

export const SendToken = () => {
  const [state, send] = useStateMachine();

  const open = state.matches("SEND_TOKEN.SEND_TOKEN");
  const can = state.can({ type: "send" });

  return (
    <Sheet
      open={open}
      onClose={() => open && send({ type: "send" })}
      icon="settings_ethernet"
      title="Send token"
      dismissible={can}
    >
      <div className="grid gap-1">
        <ListItemToken
          token={state.context.token}
          onClick={() => send({ type: "token" })}
        />
        <ListItemNetwork
          network={state.context.network}
          onClick={() => send({ type: "network" })}
        />
        <ListItemAccount label="Account" address={state.context.address} />
        <ListItemRecepient
          recepient={state.context.recepient}
          onClick={() => send({ type: "recepient" })}
        />
      </div>
      <div className="grid gap-4 mt-10">
        <Button disabled={!can} onClick={() => send({ type: "send" })}>
          Continue
        </Button>
        <Button color="hollow" onClick={() => window.close()}>
          Cancel
        </Button>
      </div>
    </Sheet>
  );
};
