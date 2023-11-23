import { FunctionComponent } from "preact";
import { useMemo } from "preact/hooks";
import { Address, useNetwork } from "wagmi";

import { useAssets } from "@/hooks";
import { SectionHeader } from "./SectionHeader";
import { TokenList } from "./TokenList/TokenList";
import { TokenContext } from "@/machines";
import { Skeleton } from "@dwidget/shared/components";

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
  const { chain, chains } = useNetwork();
  const { data, isLoading } = useAssets({
    wallet: address
      ? {
          walletAddress: address,
        }
      : undefined,
    chainId: chain?.id ?? chains[0].id,
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
      return {
        ...(data.native ? { [address]: data.native } : {}),
        ...data.tokens,
      };
    }
    return data.tokens;
  }, [address, data]);

  return (
    <div className="grid gap-6 px-4">
      {selectedToken ? (
        <div>
          <SectionHeader title="Selected token" />
          <TokenList tokens={selectedToken} onClick={onChange} />
        </div>
      ) : null}
      <div>
        <SectionHeader title="Available tokens" />
        <TokenList tokens={tokens} onClick={onChange} />
        {isLoading ? <Skeleton className="h-16 w-full" /> : null}
      </div>
    </div>
  );
};
