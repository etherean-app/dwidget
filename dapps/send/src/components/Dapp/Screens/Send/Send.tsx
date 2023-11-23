import { useCallback } from "preact/hooks";
import { Icon } from "@dwidget/shared/components";
import { TopAppBar, Button } from "@dwidget/shared-dapp/components";

import { useStateMachine } from "@/providers";
import { Form } from "./Form";

export const Send = () => {
  const [state, send] = useStateMachine();
  // const [amount, setAmount] = useState("");

  const handleAmountChange = useCallback(
    (amount: string) => {
      // setAmount(amount);
      send({ type: "SET_AMOUNT", value: amount });
    },
    [send]
  );

  return (
    <div className="flex flex-col flex-1 justify-between">
      <TopAppBar
        onBackClick={() => window.close()}
        title="Send"
        right={
          <div onClick={() => send({ type: "transactionDetails" })}>
            <Icon name="settings" className="w-6 h-6 cursor-pointer" />
          </div>
        }
      />
      <Form
        address={state.context.address}
        token={state.context.token}
        amount={state.context.amount}
        onChange={handleAmountChange}
      />
      <Button
        className="mx-4 mb-4"
        disabled={!state.can({ type: "transactionPreview" })}
        onClick={() => send({ type: "transactionPreview" })}
      >
        Continue
      </Button>
    </div>
  );
};
