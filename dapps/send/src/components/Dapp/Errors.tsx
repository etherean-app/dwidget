import { useCallback } from "preact/hooks";
import { ErrorSheet } from "@dwidget/shared-dapp/components";

import { useStateMachineRef, useStateMachineSelector } from "@/providers";

export const Errors = () => {
  const { send } = useStateMachineRef();

  const isErrorSheetSubmitOpen = useStateMachineSelector((state) =>
    state.matches("FAILURE")
  );
  const errorSubmit = useStateMachineSelector((state) => state.context.error);
  const handleCloseSubmit = useCallback(() => {
    send({ type: "close" });
  }, [send]);
  const handleTryAgainSubmit = useCallback(() => {
    send({ type: "retry" });
  }, [send]);

  return (
    <>
      <ErrorSheet
        open={isErrorSheetSubmitOpen}
        error={errorSubmit}
        onClose={handleCloseSubmit}
        onTryAgain={handleTryAgainSubmit}
      />
    </>
  );
};
