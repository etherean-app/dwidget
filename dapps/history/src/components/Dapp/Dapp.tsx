import { FunctionComponent } from "preact";
import { useEffect, useLayoutEffect } from "preact/hooks";
import { useAccount, useConnect } from "wagmi";
import { TopAppBar } from "@dwidget/shared-dapp/components";
import { FilterStatus } from "@dwidget/shared/proto/history";
import { useLocation } from "@dwidget/shared-dapp/hooks";

import { useStateMachineRef, useStateMachineSelector } from "@/providers";
import { History } from "./History";
import { DetailsSheet } from "./DetailsSheet";
import { Errors } from "./Errors";

import { RightEye } from "./RightEye";

export const Dapp: FunctionComponent = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { send } = useStateMachineRef();
  const { search, replace } = useLocation();

  useEffect(() => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    }
  }, []);

  useLayoutEffect(() => {
    const params = new URLSearchParams(search);

    const status = params.get("status");
    if (status) {
      send({
        type: "SET_FILTER",
        filter: {
          status: parseInt(status),
        },
      });
    }

    const txHash = params.get("txHash");
    if (txHash) {
      send({
        type: "SET_TXHASH",
        txHash: { value: txHash },
      });
    }

    const url = new URL(window.location.href);
    url.search = "";
    replace(url.toString(), false); // don't loop
  }, [search]);

  useEffect(() => {
    send({ type: "SET_ADDRESS", address });
  }, [address, send]);

  const title = useStateMachineSelector((state) =>
    state.context.history.filter?.status === FilterStatus.PENDING
      ? "Pending transactions"
      : "All activity"
  );

  return (
    <>
      <TopAppBar
        title={title}
        onBackClick={() => window.close()}
        right={<RightEye />}
      />
      <History />
      <DetailsSheet />
      <Errors />
    </>
  );
};
