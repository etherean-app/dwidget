import { useCallback, useState } from "preact/hooks";
import { useSwitchNetwork } from "wagmi";
import { Button, TopAppBar } from "@dwidget/shared-dapp/components";

import { useStateMachine } from "@/providers/stateMachine";
import { Form } from "./Form";

export const Network = () => {
  const [state, send] = useStateMachine();
  const { chains, switchNetworkAsync } = useSwitchNetwork();
  const [network, setNetwork] = useState(state.context.network);

  const handleChainChange = useCallback(
    (chainId: string) => {
      const chain = chains.find((chain) => chain.id === parseInt(chainId));
      setNetwork(chain);
    },
    [chains, setNetwork]
  );

  const handleSaveClick = useCallback(async () => {
    if (switchNetworkAsync) {
      await switchNetworkAsync(network?.id);
      send({ type: "backNetwork", value: network });
    }
  }, [switchNetworkAsync, send, network]);

  return (
    <div className="flex flex-col flex-1 justify-between">
      <TopAppBar
        onBackClick={() => send({ type: "backNetwork" })}
        title="Network"
      />
      <Form
        chainId={network?.id.toString()}
        onChainChange={handleChainChange}
      />
      <Button className="mx-4 mb-4" onClick={handleSaveClick}>
        Save
      </Button>
    </div>
  );
};
