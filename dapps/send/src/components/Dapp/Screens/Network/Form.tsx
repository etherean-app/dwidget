import { RadioGroup } from "@/components/common/RadioGroup";
import { FunctionComponent } from "preact";
import { useMemo } from "preact/hooks";
import { useNetwork } from "wagmi";

interface Props {
  chainId?: string;
  onChainChange: (chainId: string) => void;
}

export const Form: FunctionComponent<Props> = ({ chainId, onChainChange }) => {
  const { chains } = useNetwork();

  const elements = useMemo(
    () =>
      chains.map((chain) => ({
        label: chain.name,
        value: `${chain.id}`,
      })),
    [chains]
  );

  return (
    <div className="px-4">
      <RadioGroup
        label="Network"
        elements={elements}
        value={chainId}
        onValueChange={onChainChange}
      />
    </div>
  );
};
