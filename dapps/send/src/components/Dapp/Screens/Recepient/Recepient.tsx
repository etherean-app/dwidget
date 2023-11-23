import { useCallback } from "preact/hooks";
import { Address } from "wagmi";
import { TopAppBar } from "@dwidget/shared-dapp/components";

import { useStateMachine } from "@/providers";
import { Form } from "./Form";

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
