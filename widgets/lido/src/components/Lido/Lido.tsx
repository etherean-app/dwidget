import { fiatMoneyToString, moneyToString } from "@dwidget/shared/utils/money";
import { Skeleton } from "@dwidget/shared/components";
import useRewards from "@/hooks/data/useRewards";
import { useEffect } from "preact/hooks";
import { useAccount, useConnect } from "wagmi";
import { Column } from "./Column";
import { decimalToString } from "@dwidget/shared/utils/decimal";

export const Lido = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    }
  }, []);

  const { data, isLoading } = useRewards({
    userWallet: {
      walletAddress: address ?? "",
    },
  });

  return (
    <div className="w-full h-screen px-4 pt-4 pb-2 bg-white flex-col justify-center gap-2 flex">
      <div className="justify-between flex">
        <Column
          color="green"
          title="stETH rewarded"
          value={
            isLoading ? (
              <Skeleton className="h-[14px] w-28" />
            ) : (
              `Ξ ${decimalToString(data?.stethRewarded)}`
            )
          }
          subvalue={
            isLoading ? (
              <Skeleton className="h-[10px] w-16" />
            ) : (
              `$ ${fiatMoneyToString(data?.stethRewardedInUsd)}`
            )
          }
          className="flex-1"
        />
        <Column
          title="stETH price"
          value={
            isLoading ? (
              <Skeleton className="h-[14px] w-20" />
            ) : (
              `$ ${fiatMoneyToString(data?.stethPriceFiat)}`
            )
          }
          subvalue={
            isLoading ? (
              <Skeleton className="h-[10px] w-14" />
            ) : (
              `Ξ ${moneyToString(data?.stethPriceEth)}` // TODO: not money - Decimal
            )
          }
          className="flex-1"
        />
        <Column
          title="Average APR"
          value={
            isLoading ? (
              <Skeleton className="h-[14px] w-12" />
            ) : (
              `${decimalToString(data?.averageApr)}%`
            )
          }
        />
      </div>
      <div className="h-1 bg-white" />
    </div>
  );
};
