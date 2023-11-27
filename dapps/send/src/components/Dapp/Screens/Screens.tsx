import { useStateMachineSelector } from "@/providers/stateMachine";

import { Network } from "./Network";
import { Recepient } from "./Recepient";
import { Token } from "./Token";
import { Send } from "./Send";

export const Screens = () => {
  const content = useStateMachineSelector((state) => {
    if (state.matches("NETWORK")) {
      return <Network />;
    } else if (state.matches("RECEPIENT")) {
      return <Recepient />;
    } else if (state.matches("TOKEN")) {
      return <Token />;
    } else {
      return <Send />;
    }
  });

  return <div className="h-full flex">{content}</div>;
};
