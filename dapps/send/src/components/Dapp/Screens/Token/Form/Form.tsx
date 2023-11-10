import { FunctionComponent } from "preact";
import { useMemo } from "preact/hooks";
import { Address } from "wagmi";

import { useAssets } from "@/hooks";
import { SectionHeader } from "./SectionHeader";
import { TokenList } from "./TokenList/TokenList";
import { TokenContext } from "@/machines";

interface Props {
  address?: Address;
  value?: TokenContext;
  onChange: (token: TokenContext) => void;
}

export const Form: FunctionComponent<Props> = ({
  address,
  value,
  onChange,
}) => {
  const { data, isLoading } = useAssets({
    wallet: address
      ? {
          walletAddress: address,
        }
      : undefined,
  });

  const selectedToken = useMemo(
    () => (value ? { [value.address]: value.asset } : null),
    [value]
  );

  const tokens = useMemo(() => {
    if (!data) {
      return {};
    }

    if (address) {
      return { [address]: data.native, ...data.tokens };
    }
    return data.tokens;
  }, [address, data]);

  return (
    <div className="grid gap-6 px-4">
      {selectedToken ? (
        <div>
          <SectionHeader title="Selected token" />
          {/* @ts-ignore */}
          <TokenList tokens={selectedToken} onClick={onChange} />
        </div>
      ) : null}
      <div>
        <SectionHeader title="Available tokens" />
        {/* @ts-ignore */}
        <TokenList tokens={tokens} onClick={onChange} />
      </div>
    </div>
  );
};
