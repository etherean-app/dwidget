import { useCallback } from "preact/hooks";
import {
  useSendTransaction,
  usePrepareSendTransaction,
  useFeeData,
} from "wagmi";
import { parseEther } from "viem";
import { Button } from "@dwidget/shared-dapp/components";

import { useStateMachine } from "@/providers";
import { Details } from "./Details";

export const FormETH = () => {
  const [state, send] = useStateMachine();
  const { data: dataFee, isSuccess: isSuccessFee } = useFeeData();

  const { config, error } = usePrepareSendTransaction({
    gasPrice: dataFee?.gasPrice ?? undefined,
    to: state.context.recepient,
    value: state.context.amount ? parseEther(state.context.amount) : undefined,
    enabled: !!state.context.amount && isSuccessFee,
  });

  const { data, isLoading, isSuccess, sendTransactionAsync } =
    useSendTransaction(config);

  const handleContinueClick = useCallback(async () => {
    if (sendTransactionAsync) {
      const result = await sendTransactionAsync();
      send({ type: "transactionSubmitted" });
    }
  }, [sendTransactionAsync, send]);

  return (
    <>
      <Details />
      <div className="grid gap-4 ">
        <Button
          disabled={
            !sendTransactionAsync ||
            !state.can({ type: "transactionSubmitted" })
          }
          className="mt-4"
          onClick={handleContinueClick}
        >
          Continue
        </Button>
      </div>
    </>
  );
};
