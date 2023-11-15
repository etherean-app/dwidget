import { erc20ABI, useFeeData, usePrepareContractWrite } from "wagmi";
import { parseUnits } from "viem";

import { useStateMachine } from "@/providers/stateMachine";
import { useErc20Transfer } from "@/generated";
import { Button } from "../../../../common/Button";
import { useCallback } from "preact/hooks";
import { Details } from "./Details";
import { usdtABI } from "./usdtABI";

export const FormERC20 = () => {
  const [state, send] = useStateMachine();
  const { data: dataFee, isSuccess: isSuccessFee } = useFeeData();

  const { config, error, isError } = usePrepareContractWrite({
    gasPrice: dataFee?.gasPrice ?? undefined,
    address: state.context.token?.address,
    // @ts-ignore
    abi: state.context.token?.asset.meta?.symbol === "USDT" ? usdtABI : erc20ABI,
    functionName: "transfer",
    args:
      state.context.recepient &&
      state.context.amount &&
      state.context.token?.asset.meta?.decimals
        ? [
            state.context.recepient,
            parseUnits(
              state.context.amount,
              state.context.token?.asset.meta?.decimals
            ),
          ]
        : undefined,
    enabled: !!state.context.recepient && !!state.context.amount,
  });

  // @ts-ignore
  const { data, write: sendTransactionAsync } = useErc20Transfer(config);

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
