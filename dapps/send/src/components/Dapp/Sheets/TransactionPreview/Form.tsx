import {
  useSendTransaction,
  usePrepareSendTransaction,
  useFeeData,
} from "wagmi";
import { parseEther } from "viem";

import { useStateMachine } from "@/providers/stateMachine";
import { Button } from "../../../common/Button";
import {
  ListItem,
  ListItemAccount,
  ListItemNetwork,
  ListItemRecepient,
  ListItemAmount,
} from "../components";
import { useCallback } from "preact/hooks";

export const Form = () => {
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
      console.log("result", result);
      send({ type: "transactionSubmitted" });
    }
  }, [sendTransactionAsync, send]);

  return (
    <>
      <div className="grid gap-1">
        <ListItemNetwork
          network={state.context.network}
          onClick={() => send({ type: "network" })}
        />
        <ListItemAccount address={state.context.address} />
        <ListItem label="ERC-20" value="Gas fee 25$" notImplmented />
        <ListItemAmount
          amount={state.context.amount}
          token={state.context.token}
        />
        <ListItem label="Recipient gets" value="0.0556ETH" notImplmented />
        <ListItemRecepient
          recepient={state.context.recepient}
          onClick={() => send({ type: "recepient" })}
        />
      </div>
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
