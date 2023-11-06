import { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import { useAccount, useConnect } from "wagmi";
import { Skeleton } from "@dwidget/shared/components";
import { fiatMoneyToString } from "@dwidget/shared/utils/money";
import { decimalToString } from "@dwidget/shared/utils/decimal";

import { useSummerFi } from "@/hooks";

export const Widget: FunctionComponent = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    }
  }, []);

  const { data, isLoading } = useSummerFi({
    userWallet: {
      walletAddress: address ?? "",
    },
    market: "WSTETH-A",
  });

  return (
    <div className="w-full h-screen grid gap-[1px]">
      <div className="flex">
        <div className="grow shrink basis-0 p-4 bg-white flex-col justify-center items-start gap-2 inline-flex">
          <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
            Liqudation price
          </div>
          <div className="flex-col justify-center items-start gap-0.5 flex">
            <div className="text-zinc-800 h-[24px] text-[17px] font-semibold font-['SF Pro Text'] leading-normal">
              {isLoading ? (
                <Skeleton className="h-[16px] w-28 inline-block" />
              ) : (
                `$ ${fiatMoneyToString(data?.liquidation?.price)}`
              )}
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              <div className="inline-flex">
                {isLoading ? (
                  <Skeleton className="h-[10px] w-10 inline-block" />
                ) : (
                  `${decimalToString(data?.liquidation?.priceBellow)}%`
                )}
              </div>{" "}
              below
              <br />
              current price
            </div>
          </div>
        </div>
        <div className="grow shrink basis-0 p-4 bg-white flex-col justify-center items-start gap-2 inline-flex">
          <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
            Collateralization Ratio
          </div>
          <div className="flex-col justify-center items-start gap-0.5 flex">
            <div className="text-zinc-800 h-[24px] text-[17px] font-semibold font-['SF Pro Text'] leading-normal">
              {isLoading ? (
                <Skeleton className="h-[16px] w-16 inline-block" />
              ) : (
                `${decimalToString(data?.collateralization?.ratio)} %`
              )}
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              <div className="inline-flex">
                {isLoading ? (
                  <Skeleton className="h-[10px] w-10 inline-block" />
                ) : (
                  `${decimalToString(
                    data?.collateralization?.ratioOnNextPrice
                  )}%`
                )}
              </div>{" "}
              on
              <br /> next price
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white flex-col justify-center items-start gap-2 flex">
        <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
          Collateral Locked
        </div>
        <div className="flex-col justify-center items-start gap-0.5 flex">
          <div className="text-zinc-800 text-[17px] font-semibold font-['SF Pro Text'] leading-normal">
            {isLoading ? (
              <Skeleton className="h-[16px] w-28 inline-block" />
            ) : (
              `$ ${fiatMoneyToString(data?.collateral?.lockedFiat)}`
            )}
          </div>
          <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
            {isLoading ? (
              <Skeleton className="h-[10px] w-24 inline-block" />
            ) : (
              `${decimalToString(data?.collateral?.locked)} ${
                data?.collateral?.tokenMeta?.symbol ?? ""
              }`
            )}
          </div>
        </div>
      </div>
      <div className="p-4 bg-white flex-col justify-center items-start gap-5 flex">
        <div className="self-stretch justify-between items-start inline-flex">
          <div className="flex-col justify-center items-start gap-0.5 inline-flex">
            <div className="text-zinc-800 text-[11px] font-semibold font-['SF Pro Text'] leading-3 tracking-tight">
              {isLoading ? (
                <Skeleton className="h-[10px] w-24 inline-block" />
              ) : (
                `${decimalToString(data?.vault?.tokenAmount)} ${
                  data?.vault?.tokenMeta?.symbol ?? ""
                }`
              )}
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              Vault <br />{" "}
              {isLoading ? (
                <Skeleton className="h-[10px] w-6 inline-block" />
              ) : (
                `${data?.vault?.tokenMeta?.symbol ?? ""}`
              )}{" "}
              Debt
            </div>
          </div>
          <div className="flex-col justify-center items-start gap-0.5 inline-flex">
            <div className="text-zinc-800 text-[11px] font-semibold font-['SF Pro Text'] leading-3 tracking-tight">
              {isLoading ? (
                <Skeleton className="h-[10px] w-24 inline-block" />
              ) : (
                `${decimalToString(data?.available?.withdraw)} ${
                  data?.collateral?.tokenMeta?.symbol ?? ""
                }`
              )}
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              Available <br /> to Withdraw
            </div>
          </div>
          <div className="flex-col justify-center items-start gap-0.5 inline-flex">
            <div className="text-zinc-800 text-[11px] font-semibold font-['SF Pro Text'] leading-3 tracking-tight">
              {isLoading ? (
                <Skeleton className="h-[10px] w-16 inline-block" />
              ) : (
                `${decimalToString(data?.available?.generate)} ${
                  data?.vault?.tokenMeta?.symbol ?? ""
                }`
              )}
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              Available <br /> to Genetate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
