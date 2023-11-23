import { FunctionComponent } from "preact";
import { useEffect, useCallback } from "preact/hooks";
import { useAccount, useConnect } from "wagmi";
import { StateFrom } from "xstate";
import { TopAppBar } from "@dwidget/shared-dapp/components";

import { useStateMachineRef } from "@/providers";
import { History } from "./History";
import { DetailsSheet } from "./DetailsSheet";
import { Errors } from "./Errors";

export const Dapp: FunctionComponent = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { send } = useStateMachineRef();

  useEffect(() => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    }
  }, []);

  useEffect(() => {
    send({ type: "SET_ADDRESS", address });
  }, [address, send]);

  return (
    <>
      <TopAppBar title="All activity" onBackClick={() => window.close()} />
      <History />
      <DetailsSheet />
      <Errors />
    </>
  );
};
