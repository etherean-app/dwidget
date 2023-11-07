import { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import { useAccount, useConnect } from "wagmi";
import { SwapWidget } from "@uniswap/widgets";

export const Widget: FunctionComponent = () => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    }
  }, []);

  return (
    <div className="uniswap">
      <SwapWidget width="100%" />
    </div>
  );
};
