import { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import { useAccount, useConnect } from "wagmi";
import uniswap from "@/assets/uniswap.png";
import { useRewards } from "@/hooks";

export const Widget: FunctionComponent = () => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    }
  }, []);

  const { data } = useRewards({
    userWallet: {
      walletAddress: "0x8aD8b3874430aE7bDFe579Da5e4088787005F0ED",
    },
    tokens: [
      { symbol: "STETH" },
      { symbol: "WETH" },
      { symbol: "ETH" },
      { symbol: "DAI" },
      { symbol: "USDC" },
    ],
  });

  console.log(data);

  return (
    <div className="w-full h-screen rounded-3xl flex-col justify-start items-start gap-px inline-flex">
      <div className="w-full p-4 bg-white justify-start items-center gap-2 inline-flex">
        <img className="w-12 h-12" src={uniswap} />
        <div className="grow shrink basis-0 flex-col justify-center items-start gap-2 inline-flex">
          <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
            LP-tokens
          </div>
          <div className="flex-col justify-center items-start gap-0.5 flex">
            <div className="text-zinc-800 text-[17px] font-semibold font-['SF Pro Text'] leading-normal">
              10 steCRV
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              $14.3959
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4 bg-white flex-col justify-center items-start gap-2 flex">
        <div className="text-zinc-800 text-[11px] font-semibold font-['SF Pro Text'] leading-3 tracking-tight">
          Base vAPY
        </div>
        <div className="w-full justify-between items-start inline-flex">
          <div className="grow shrink basis-0 flex-col justify-center items-start gap-0.5 inline-flex">
            <div className="text-zinc-800 text-[11px] font-semibold font-['SF Pro Text'] leading-3 tracking-tight">
              2.9%
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              Daily
            </div>
          </div>
          <div className="grow shrink basis-0 flex-col justify-center items-start gap-0.5 inline-flex">
            <div className="text-zinc-800 text-[11px] font-semibold font-['SF Pro Text'] leading-3 tracking-tight">
              1.57%
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              Weekly
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4 bg-white flex-col justify-center items-start gap-2 flex">
        <div className="text-zinc-800 text-[11px] font-semibold font-['SF Pro Text'] leading-3 tracking-tight">
          Reward tAPR
        </div>
        <div className="w-full justify-between items-start inline-flex">
          <div className="grow shrink basis-0 flex-col justify-center items-start gap-0.5 inline-flex">
            <div className="text-zinc-800 text-[11px] font-semibold font-['SF Pro Text'] leading-3 tracking-tight">
              0.0011$ → 0.0028%
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              CRV
            </div>
          </div>
          <div className="grow shrink basis-0 flex-col justify-center items-start gap-0.5 inline-flex">
            <div className="text-zinc-800 text-[11px] font-semibold font-['SF Pro Text'] leading-3 tracking-tight">
              0.98%
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              wstETH
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4 bg-white justify-start items-start inline-flex flex-1">
        <div className="grow shrink basis-0 flex-col justify-center items-start gap-2 inline-flex">
          <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
            ETH
          </div>
          <div className="flex-col justify-center items-start gap-0.5 flex">
            <div className="text-zinc-800 text-[17px] font-semibold font-['SF Pro Text'] leading-normal">
              $ 62,735.57
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              49.85%
            </div>
          </div>
        </div>
        <div className="grow shrink basis-0 flex-col justify-center items-start gap-2 inline-flex">
          <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
            stETH
          </div>
          <div className="flex-col justify-center items-start gap-0.5 flex">
            <div className="text-zinc-800 text-[17px] font-semibold font-['SF Pro Text'] leading-normal">
              $63,094.25
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              50.15%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
