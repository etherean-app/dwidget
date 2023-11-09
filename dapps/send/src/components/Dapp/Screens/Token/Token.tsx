import { useCallback, useState } from "preact/hooks";
import { useStateMachine } from "@/providers/stateMachine";

import { TokenContext } from "@/machines";
import { TopAppBar } from "../../../common/TopAppBar";
import { Button } from "../../../common/Button";
import { Form } from "./Form";

export const Token = () => {
  const [state, send] = useStateMachine();
  const [token, setToken] = useState(state.context.token);

  const handleTokenChange = useCallback(
    (token: TokenContext) => setToken(token),
    []
  );

  return (
    <div className="flex flex-col grow">
      <TopAppBar
        onBackClick={() => send({ type: "backToken" })}
        title="Token"
      />
      <div className="flex flex-col grow justify-between overflow-y-auto">
        <Form value={token} onChange={handleTokenChange} />
        <Button
          className="mx-4 mb-4 mt-6"
          onClick={() => send({ type: "backToken", value: token })}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
