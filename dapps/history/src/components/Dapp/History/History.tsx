import { useCallback, useMemo } from "preact/hooks";
import PullToRefresh from "react-simple-pull-to-refresh";
import { HistoryEntry } from "@dwidget/shared/proto/history";
import { Timestamp } from "@dwidget/shared/proto/google/protobuf/timestamp";
import { HistoryItem } from "@dwidget/shared/components/history";
import { Skeleton } from "@dwidget/shared/components";

import { useStateMachineRef, useStateMachineSelector } from "@/providers";
import { HistoryDate } from "./HistoryDate";

export const History = () => {
  const { send } = useStateMachineRef();

  const entries = useStateMachineSelector(
    (state) => state.context.history.entries
  );

  const isLoading = useStateMachineSelector((state) =>
    state.matches("HISTORY.LOAD.loading")
  );
  const isLoadingMore = useStateMachineSelector((state) =>
    state.matches("HISTORY.LOAD.loadMore")
  );

  const handleHistoryItemClick = useCallback(
    (entry: HistoryEntry) => {
      send({ type: "SET_TXHASH", txHash: entry.txHash });
    },
    [send]
  );

  const grouped = useMemo(
    () =>
      entries.reduce((acc, el) => {
        if (!el.timestamp) el.timestamp = Timestamp.fromDate(new Date());
        const date = Timestamp.toDate(el.timestamp).toDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(el);
        return acc;
      }, {} as { [date: string]: HistoryEntry[] }),
    [entries]
  );

  const history = useMemo(() => {
    return Object.entries(grouped).map(([date, entries]) => {
      return (
        <>
          <HistoryDate date={date} />
          <div>
            {entries.map((entry) => (
              <HistoryItem
                key={entry.txHash}
                entry={entry}
                onClick={handleHistoryItemClick}
              />
            ))}
          </div>
        </>
      );
    });
  }, [grouped]);

  const isCanFetchMore = useStateMachineSelector(
    (state) =>
      state.matches("HISTORY.success") && !!state.context.history.cursor
  );

  return (
    <PullToRefresh
      canFetchMore={isCanFetchMore}
      // refreshingContent={"refreshingContent"}
      // pullingContent={"pullingContent"}
      onRefresh={async () => send({ type: "FETCH_HISTORY" })}
      onFetchMore={async () => send({ type: "FETCH_HISTORY_MORE" })}
    >
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <>
            <Skeleton className="h-4 mb-4 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </>
        ) : (
          history
        )}
        {isLoadingMore && (
          <>
            <Skeleton className="h-4 mb-4 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </>
        )}
      </div>
    </PullToRefresh>
  );
};
