import useRewards from "@/hooks/data/useRewards";
import { useEffect } from "preact/hooks";
import { useAccount, useConnect } from "wagmi";
import { observer } from "@legendapp/state/react";
import { Column } from "./Column";
// import { Reactive } from "@legendapp/state/react";

export const Widget = observer(function Widget() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    }
  }, []);

  const { data: _data } = useRewards({
    userWallet: address ?? "",
    limit: 2,
  });

  return (
    <div>
      <div className="w-full h-[84px] px-4 pt-4 pb-2 bg-white flex-col justify-center items-start gap-2 inline-flex">
        <div className="self-stretch justify-between items-start inline-flex">
          <Column
            color="green"
            title="stETH rewarded"
            value="Ξ 0.2357"
            subvalue="$ 345"
          />
          <Column title="stETH price" value="$ 1,575.67" subvalue="Ξ 0.9999" />
          <Column title="Average APR" value="4,7%" />
        </div>
        <div className="self-stretch h-1 bg-white" />
      </div>
      {/* <h1 className="text-3xl font-bold  text-center">{data.rewards} 1</h1> */}
    </div>
  );
});
