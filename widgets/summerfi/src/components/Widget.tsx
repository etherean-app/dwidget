import { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import { useAccount, useConnect } from "wagmi";

export const Widget: FunctionComponent = () => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    }
  }, []);

  return (
    <div className="w-full h-screen grid gap-[1px]">
      <div className="flex">
        <div className="grow shrink basis-0 p-4 bg-white flex-col justify-center items-start gap-2 inline-flex">
          <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
            Liqudation price
          </div>
          <div className="flex-col justify-center items-start gap-0.5 flex">
            <div className="text-zinc-800 text-[17px] font-semibold font-['SF Pro Text'] leading-normal">
              $ 1.235.57
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              29.39% below
              <br /> current price
            </div>
          </div>
        </div>
        <div className="grow shrink basis-0 p-4 bg-white flex-col justify-center items-start gap-2 inline-flex">
          <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
            Collateralization Ratio
          </div>
          <div className="flex-col justify-center items-start gap-0.5 flex">
            <div className="text-zinc-800 text-[17px] font-semibold font-['SF Pro Text'] leading-normal">
              212.45 %
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              219.39% on
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
            $ 28.235.57
          </div>
          <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
            14.39594 WSTETH
          </div>
        </div>
      </div>
      <div className="p-4 bg-white flex-col justify-center items-start gap-5 flex">
        <div className="self-stretch justify-between items-start inline-flex">
          <div className="flex-col justify-center items-start gap-0.5 inline-flex">
            <div className="text-zinc-800 text-[11px] font-semibold font-['SF Pro Text'] leading-3 tracking-tight">
              10,234.2357 DAI
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              Vault <br /> Dai Debt
            </div>
          </div>
          <div className="flex-col justify-center items-start gap-0.5 inline-flex">
            <div className="text-zinc-800 text-[11px] font-semibold font-['SF Pro Text'] leading-3 tracking-tight">
              5.67 WSTETH
            </div>
            <div className="text-slate-500 text-[11px] font-normal font-['SF Pro Text'] leading-3 tracking-tight">
              Available <br /> to Withdraw
            </div>
          </div>
          <div className="flex-col justify-center items-start gap-0.5 inline-flex">
            <div className="text-zinc-800 text-[11px] font-semibold font-['SF Pro Text'] leading-3 tracking-tight">
              4,7%
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
