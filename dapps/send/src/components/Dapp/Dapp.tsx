import { useEffect } from "preact/hooks";
import { useAccount, useConnect, useNetwork } from "wagmi";
import { pick } from "lodash";

import { useStateMachine } from "@/providers";
import { Sheets } from "./Sheets";
import { Screens } from "./Screens";

export const Dapp = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const [state, send] = useStateMachine();

  useEffect(() => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    }
  }, []);

  const { chain } = useNetwork();
  useEffect(() => {
    send({ type: "SET_NETWORK", value: chain });
  }, [chain, send]);

  useEffect(() => {
    send({ type: "SET_ADDRESS", value: address });
  }, [address, send]);

  useEffect(() => {
    localStorage.setItem(
      "state-machine-context",
      JSON.stringify(pick(state.context, ["recepient"]), (_, v) =>
        typeof v === "bigint" ? v.toString() : v
      )
    );
  }, [state]);

  return (
    <>
      <Screens />
      <Sheets />
    </>
  );
};
