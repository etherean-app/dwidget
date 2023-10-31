import useRewards from "@/hooks/data/useRewards";
import { useEffect } from "preact/hooks";
import { useAccount, useConnect } from "wagmi";
import { w } from "windstitch";
import { Column } from "./Column";

const Skeleton = w.div(
  "animate-pulse bg-gray-100 dark:bg-gray-300 rounded-full"
);

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

  const stethRewardedInUsd =
    data?.stethRewardedInUsd?.units && data?.stethRewardedInUsd?.nanos
      ? `${data?.stethRewardedInUsd?.units}.${data?.stethRewardedInUsd?.nanos}`
      : 0;

  return (
    <div className="w-full h-screen px-4 pt-4 pb-2 bg-white flex-col justify-center gap-2 flex">
      <div className="justify-between flex">
        <Column
          color="green"
          title="stETH rewarded"
          value={
            isLoading ? (
              <Skeleton className="h-[16px] w-28" />
            ) : (
              `Ξ ${data?.stethRewarded?.value ?? 0}`
            )
          }
          subvalue={
            isLoading ? (
              <Skeleton className="h-[12px] w-16" />
            ) : (
              `$ ${stethRewardedInUsd}`
            )
          }
          className="flex-1"
        />
        <Column
          title="stETH price"
          value={
            isLoading ? <Skeleton className="h-[16px] w-20" /> : "$ 1,575.67"
          }
          subvalue={
            isLoading ? <Skeleton className="h-[12px] w-14" /> : "Ξ 0.9999"
          }
          className="flex-1"
        />
        <Column
          title="Average APR"
          value={
            isLoading ? (
              <Skeleton className="h-[16px] w-12" />
            ) : (
              `${data?.averageApr?.value ?? 0}%`
            )
          }
        />
      </div>
      <div className="h-1 bg-white" />
    </div>
  );
};
