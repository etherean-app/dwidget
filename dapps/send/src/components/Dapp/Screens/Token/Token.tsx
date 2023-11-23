import { useCallback, useState } from "preact/hooks";
import { Button, TopAppBar } from "@dwidget/shared-dapp/components";

import { useStateMachine } from "@/providers";
import { TokenContext } from "@/machines";
import { Form } from "./Form";

export const Token = () => {
  const [state, send] = useStateMachine();
  const [token, setToken] = useState(state.context.token);

  const handleTokenChange = useCallback(
    (token: TokenContext) => setToken(token),
    [setToken]
  );

  return (
    <div className="flex flex-col grow">
      <TopAppBar
        onBackClick={() => send({ type: "backToken" })}
        title="Token"
      />
      <div className="flex flex-col grow justify-between overflow-y-auto">
        <Form
          address={state.context.address}
          value={token}
          onChange={handleTokenChange}
        />
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
