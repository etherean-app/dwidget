import { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import { useAccount, useConnect } from "wagmi";

import { useHistory } from "@/hooks";
import { HistoryWidget } from "./HistoryWidget";
import { PendingTransactionsWidget } from "./PendingTransactionsWidget";

export const Widget: FunctionComponent = () => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    }
  }, []);

  return (
    <div className="grid gap-4">
      <HistoryWidget />
      <PendingTransactionsWidget />
    </div>
  );
};
