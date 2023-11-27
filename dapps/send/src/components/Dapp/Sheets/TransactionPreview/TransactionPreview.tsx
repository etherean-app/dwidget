import { Sheet } from "@dwidget/shared-dapp/components";

import { useStateMachineRef, useStateMachineSelector } from "@/providers";
import { FormETH, FormERC20 } from "./Form";

export const TransactionPreview = () => {
  const { send } = useStateMachineRef();
  const open = useStateMachineSelector((state) =>
    state.matches("SEND_TOKEN.TRANSACTION_PREVIEW")
  );

  const isETH = useStateMachineSelector(
    (state) => state.context.address === state.context.token?.address
  );

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
