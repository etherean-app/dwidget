import { useCallback, useMemo } from "preact/hooks";
import PullToRefresh from "react-simple-pull-to-refresh";
import { HistoryEntry } from "@dwidget/shared/proto/history";
import { Timestamp } from "@dwidget/shared/proto/google/protobuf/timestamp";

import { useStateMachineRef, useStateMachineSelector } from "@/providers";
import { HistoryItem } from "./HistoryItem";
import { HistoryDate } from "./HistoryDate";
import { Skeleton } from "@dwidget/shared/components";

export const History = () => {
  const { send } = useStateMachineRef();

  const entries = useStateMachineSelector(
    (state) => state.context.history.entries
  );

  const isLoading = useStateMachineSelector(
    (state) =>
      state.matches("HISTORY.LOAD.loading") ||
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
        if (!el.timestamp) return acc;
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
          <div className="date-group">
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
        {history}
        {isLoading && (
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
