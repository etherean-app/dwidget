import { useCallback } from "preact/hooks";
import {
  erc20ABI,
  useContractWrite,
  useFeeData,
  usePrepareContractWrite,
} from "wagmi";
import { parseUnits } from "viem";
import { Button } from "@dwidget/shared-dapp/components";

import { useStateMachine } from "@/providers";
import { useGasEstimate } from "@/hooks";
import { Details } from "./Details";
import { usdtABI } from "./usdtABI";

// multiplier 150 -> 1.5
const getSafeGasLimit = (gas: bigint, multiplier = 150n) =>
  (gas * multiplier) / 100n;

export const FormERC20 = () => {
  const [state, send] = useStateMachine();
  const { data: dataFee, isSuccess: isSuccessFee } = useFeeData();

  const { config, isSuccess, error } = usePrepareContractWrite({
    address: state.context.token?.address,
    // @ts-ignore
    abi:
      state.context.token?.asset.meta?.symbol === "USDT" ? usdtABI : erc20ABI,
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
    enabled:
      !!state.context.recepient &&
      !!state.context.amount &&
      !!state.context.token?.asset.meta?.decimals &&
      isSuccessFee,
  });
  const gas = useGasEstimate(isSuccess ? config.request : null);

  const { data, writeAsync: sendTransactionAsync } = useContractWrite({
    ...config,
    request: {
      ...config.request,
      gas: gas.result ? getSafeGasLimit(gas.result) : undefined,
      // @ts-ignore
      gasPrice: dataFee?.gasPrice ?? undefined,
    },
  });

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
