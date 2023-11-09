import { useMemo } from "preact/hooks";
import { useStateMachine } from "@/providers/stateMachine";

import { Network } from "./Network";
import { Recepient } from "./Recepient";
import { Token } from "./Token";
import { Send } from "./Send";

export const Screens = () => {
  const [state, send] = useStateMachine();

  const content = useMemo(() => {
    if (state.matches("NETWORK")) {
      return <Network />;
    } else if (state.matches("RECEPIENT")) {
      return <Recepient />;
    } else if (state.matches("TOKEN")) {
      return <Token />;
    } else {
      return <Send />;
    }
  }, [state.value]);

  return <div className="h-full flex">{content}</div>;
};
