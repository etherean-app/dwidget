import { useCallback } from "preact/hooks";

import { useStateMachineRef, useStateMachineSelector } from "@/providers";
import { ErrorSheet } from "./ErrorSheet";

export const Errors = () => {
  const { send } = useStateMachineRef();

  const isErrorSheetHistoryOpen = useStateMachineSelector((state) =>
    state.matches("HISTORY.failure")
  );
  const errorSheetHistory = useStateMachineSelector(
    (state) => state.context.history?.error
  );
  const handleCloseHistory = useCallback(() => {
    send({ type: "closeHistoryFailure" });
  }, [send]);
  const handleTryAgainHistory = useCallback(() => {
    send({ type: "retryHistory" });
  }, [send]);

  const isErrorSheetHistoryEntryOpen = useStateMachineSelector((state) =>
    state.matches("DETAILS.failure")
  );
  const errorSheetHistoryEntry = useStateMachineSelector(
    (state) => state.context.historyEntry?.error
  );
  const handleCloseHistoryEntry = useCallback(() => {
    send({ type: "closeHistoryEntryFailure" });
  }, [send]);
  const handleTryAgainHistoryEntry = useCallback(() => {
    send({ type: "retryHistoryEntry" });
  }, [send]);

  return (
    <>
      <ErrorSheet
        open={isErrorSheetHistoryOpen}
        error={errorSheetHistory}
        onClose={handleCloseHistory}
        onTryAgain={handleTryAgainHistory}
      />
      <ErrorSheet
        open={isErrorSheetHistoryEntryOpen}
        error={errorSheetHistoryEntry}
        onClose={handleCloseHistoryEntry}
        onTryAgain={handleTryAgainHistoryEntry}
      />
    </>
  );
};
