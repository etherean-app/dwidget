import { useCallback, useState } from "preact/hooks";
import { Address } from "wagmi";
import { isAddress } from "viem";

import { useStateMachine } from "@/providers/stateMachine";
import { TopAppBar } from "../../../common/TopAppBar";
import { Form } from "./Form";

// TODO:
export const Recepient = () => {
  const [state, send] = useStateMachine();

  const handleSaveClick = useCallback(
    (recepient: Address) => send({ type: "backRecepient", value: recepient }),
    [send]
  );

  return (
    <div className="flex flex-col grow">
      <TopAppBar
        onBackClick={() => send({ type: "backRecepient" })}
        title="Recepient"
      />
      <Form recepient={state.context.recepient} onSave={handleSaveClick} />
    </div>
  );
};
