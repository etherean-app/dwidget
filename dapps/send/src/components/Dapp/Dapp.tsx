import { useEffect } from "preact/hooks";
import { useAccount, useConnect } from "wagmi";

import { useStateMachine } from "@/providers/stateMachine";
import { Sheets } from "./Sheets";
import { Screens } from "./Screens";

export const Dapp = () => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const [state, send] = useStateMachine();

  useEffect(() => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    }
  }, []);

  return (
    <>
      <Screens />
      <Sheets />
    </>
  );
};
