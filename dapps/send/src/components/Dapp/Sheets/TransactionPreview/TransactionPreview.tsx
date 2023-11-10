import { useStateMachine } from "@/providers/stateMachine";
import { Sheet } from "../components";
import { Form } from "./Form";

export const TransactionPreview = () => {
  const [state, send] = useStateMachine();

  const open = state.matches("TRANSACTION_PREVIEW");

  return (
    <Sheet
      open={open}
      onClose={() => open && send({ type: "back" })}
      icon="layers"
      title="Transaction preview"
    >
      <Form />
    </Sheet>
  );
};
