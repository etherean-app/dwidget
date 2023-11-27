import { Sheet, Button } from "@dwidget/shared-dapp/components";

import { useStateMachineRef, useStateMachineSelector } from "@/providers";
import {
  ListItemToken,
  ListItemAccount,
  ListItemNetwork,
  ListItemRecepient,
} from "./components";

export const SendToken = () => {
  const { send } = useStateMachineRef();

  const open = useStateMachineSelector((state) =>
    state.matches("SEND_TOKEN.SEND_TOKEN")
  );
  const can = useStateMachineSelector((state) => state.can({ type: "send" }));

  const { token, network, address, recepient } = useStateMachineSelector(
    (state) => ({
      token: state.context.token,
      network: state.context.network,
      address: state.context.address,
      recepient: state.context.recepient,
    })
  );

  return (
    <Sheet
      open={open}
      onClose={() => open && send({ type: "send" })}
      icon="settings_ethernet"
      title="Send token"
      dismissible={can}
    >
      <div className="grid gap-1">
        <ListItemToken token={token} onClick={() => send({ type: "token" })} />
        <ListItemNetwork
          network={network}
          onClick={() => send({ type: "network" })}
        />
        <ListItemAccount label="Account" address={address} />
        <ListItemRecepient
          recepient={recepient}
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
