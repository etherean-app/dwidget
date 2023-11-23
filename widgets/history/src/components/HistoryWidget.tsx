import { FunctionComponent } from "preact";
import { useCallback, useMemo } from "preact/hooks";
import { useAccount } from "wagmi";
import { HistoryEntry } from "@dwidget/shared/proto/history";
import { HistoryItem } from "@dwidget/shared/components/history";
import { Skeleton } from "@dwidget/shared/components";
import { deepLinkDappNative } from "@dwidget/shared/utils";

import { useHistory } from "@/hooks";
import { HISTORY_DAPP_URL } from "@/constants";

export const HistoryWidget: FunctionComponent = () => {
  const { address } = useAccount();
  const { data, isLoading } = useHistory({
    wallet: address
      ? {
          walletAddress: address,
        }
      : undefined,
    cursor: {
      limit: 2,
    },
  });

  const handleEntryClick = useCallback((entry: HistoryEntry) => {
    if (entry.txHash) {
      window.open(
        deepLinkDappNative(`${HISTORY_DAPP_URL}?txHash=${entry.txHash.value}`),
        "_blank"
      );
    }
  }, []);

  const history = useMemo(
    () =>
      data?.entries
        .slice(0, 2)
        .map((entry) => (
          <HistoryItem
            key={entry.txHash}
            entry={entry}
            onClick={handleEntryClick}
            className="h-14"
          />
        )),
    [data?.entries]
  );

  return (
    <div className="h-[164px] pb-3 bg-primary-container rounded-[32px] flex-col flex">
      <div className="h-28 flex-col flex">
        {isLoading ? (
          <div className="grid gap-2 pt-3">
            <Skeleton className="mx-3 h-10" />
            <Skeleton className="mx-3 h-10" />
          </div>
        ) : (
          history
        )}
      </div>
      <div
        className="h-10 mx-3 justify-center items-center flex bg-[#A2C9FF] rounded-[40px] text-center text-black text-sm font-medium font-['Roboto'] leading-tight tracking-tight"
        onClick={() =>
          window.open(deepLinkDappNative(HISTORY_DAPP_URL), "_blank")
        }
      >
        All activity
      </div>
    </div>
  );
};
