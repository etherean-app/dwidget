import { FunctionComponent } from "preact";
import { useMemo } from "preact/hooks";
import { useAccount, useBalance } from "wagmi";

import { useAssets } from "@/hooks";
import { SectionHeader } from "./SectionHeader";
import { data } from "./data";
import { TokenList } from "./TokenList/TokenList";
import { TokenContext } from "@/machines";

interface Props {
  value?: TokenContext;
  onChange: (token: TokenContext) => void;
}

export const Form: FunctionComponent<Props> = ({ value, onChange }) => {
  const { address } = useAccount();
  const {
    data: native,
    isError,
    isLoading,
  } = useBalance({
    address,
  });

  // const { data, isLoading } = useAssets({
  //   wallet: address
  //     ? {
  //         walletAddress: address,
  //       }
  //     : undefined,
  // });

  console.log(88888, native);

  const selectedToken = useMemo(
    () => (value?.asset ? [value.asset] : null),
    [value]
  );

  const tokens = useMemo(() => {
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
          <TokenList tokens={selectedToken} onClick={onChange} />
        </div>
      ) : null}
      <div>
        <SectionHeader title="Available tokens" />
        <TokenList tokens={tokens} onClick={onChange} />
      </div>
    </div>
  );
};
