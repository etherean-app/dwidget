import { useStateMachine } from "@/providers/stateMachine";
import { Sheet } from "../components";
import { FormETH, FormERC20 } from "./Form";

export const TransactionPreview = () => {
  const [state, send] = useStateMachine();
  const open = state.matches("TRANSACTION_PREVIEW");

  const isETH = state.context.address === state.context.token?.address;

  return (
    <Sheet
      open={open}
      onClose={() => open && send({ type: "back" })}
      icon="layers"
      title="Transaction preview"
    >
      {isETH ? <FormETH /> : <FormERC20 />}
    </Sheet>
  );
};
