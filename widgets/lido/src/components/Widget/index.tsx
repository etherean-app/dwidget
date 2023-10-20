import useRewards from "@/hooks/data/useRewards";
import { useEffect } from "preact/hooks";
import { useAccount, useConnect } from "wagmi";
import { observer } from "@legendapp/state/react";
// import { Reactive } from "@legendapp/state/react";

// const Column = () => {
//   return (
//     <div className="flex-col justify-center items-start gap-0.5 inline-flex">
//       <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
//         stETH rewarded
//       </div>
//       <div className="text-emerald-500 text-[15px] font-semibold font-['SF Pro Text'] leading-tight">
//         Ξ 0.2357
//       </div>
//       <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
//         $ 345
//       </div>
//     </div>
//   );
// };

export const Widget = observer(function Widget() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    }
  }, []);

  const { data } = useRewards({
    userWallet: address ?? "",
    limit: 2,
  });

  return (
    <div>
      <div className="w-full h-[145px] px-4 pt-4 pb-2 bg-white flex-col justify-center items-start gap-2 inline-flex">
        <div className="self-stretch justify-between items-start inline-flex">
          <div className="flex-col justify-center items-start gap-0.5 inline-flex">
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              stETH rewarded
            </div>
            <div className="text-emerald-500 text-[15px] font-semibold font-['SF Pro Text'] leading-tight">
              Ξ 0.2357
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              $ 345
            </div>
          </div>
          <div className="flex-col justify-center items-start gap-0.5 inline-flex">
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              stETH price
            </div>
            <div className="text-zinc-800 text-[15px] font-semibold font-['SF Pro Text'] leading-tight">
              $ 1,575.67
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              Ξ 0.9999
            </div>
          </div>
          <div className="flex-col justify-center items-start gap-0.5 inline-flex">
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              Average APR
            </div>
            <div className="text-zinc-800 text-[15px] font-semibold font-['SF Pro Text'] leading-tight">
              4,7%
            </div>
          </div>
        </div>
        <div className="self-stretch h-1 bg-white" />
        <div className="self-stretch justify-end items-center gap-3 inline-flex">
          <div className="grow shrink basis-0 h-px bg-slate-200" />
        </div>
        <div className="self-stretch bg-white justify-start items-center inline-flex">
          <div className="w-[42px] self-stretch pr-3 justify-start items-center gap-2.5 flex">
            <div className="w-[30px] h-[30px] relative rounded-[7px]">
              <div className="w-[30px] h-[30px] left-0 top-0 absolute bg-slate-200 rounded-[7px]" />
              <div className="w-5 h-5 left-[5px] top-[5px] absolute" />
            </div>
          </div>
          <div className="grow shrink basis-0 py-3 flex-col justify-center items-start gap-0.5 inline-flex">
            <div className="self-stretch h-5 text-zinc-800 text-xs font-normal font-['SF Pro Text'] leading-none">
              + 7% per year
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold  text-center">{data.rewards} 1</h1>
    </div>
  );
});
