import { useCallback, useState } from "preact/hooks";
import { useStateMachine } from "@/providers/stateMachine";

import { TopAppBar } from "../../../common/TopAppBar";
import { Button } from "../../../common/Button";
import { Form } from "./Form";

// TODO:
export const Recepient = () => {
  const [state, send] = useStateMachine();
  const [network, setNetwork] = useState(state.context.network);

  const handleNetworkChange = useCallback(
    (network: string) => setNetwork(network),
    []
  );

  return (
    <div className="flex flex-col flex-1 justify-between">
      <TopAppBar onBackClick={() => send("back")} title="Recepient" />
      <Form value={network} onChange={handleNetworkChange} />
      <Button className="mx-4 mb-4" onClick={() => send({ type: "back" })}>
        Save
      </Button>
    </div>
  );
};
