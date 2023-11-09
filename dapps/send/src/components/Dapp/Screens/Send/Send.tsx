import { Icon } from "@/components/common/Icon";
import { Button } from "../../../common/Button";
import { TopAppBar } from "../../../common/TopAppBar";
import { Form } from "./Form";
import { useStateMachine } from "@/providers/stateMachine";

export const Send = () => {
  const [state, send] = useStateMachine();

  return (
    <div className="flex flex-col flex-1 justify-between">
      <TopAppBar
        onBackClick={() => window.close()}
        title="Send"
        right={
          <div onClick={() => send("transactionDetails")}>
            <Icon name="settings" className="w-6 h-6 cursor-pointer" />
          </div>
        }
      />
      <Form token={state.context.token} />
      <Button className="mx-4 mb-4" onClick={() => send("transactionPreview")}>
        Continue
      </Button>
    </div>
  );
};
