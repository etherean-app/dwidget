import { FunctionComponent } from "preact";
import { Address } from "wagmi";
import { TokenAsset } from "@dwidget/shared/proto/assets";

import { TokenContext } from "@/machines";
import { TokenItem } from "./TokenItem";

interface Props {
  tokens: {
    [key: string]: TokenAsset;
  };
  onClick: (token: TokenContext) => void;
}

export const TokenList: FunctionComponent<Props> = ({ tokens, onClick }) => {
  return (
    <div className="flex flex-col bg-[#E6EEFF] rounded-[20px] divide-y divide-outline-variant">
      {Object.entries(tokens).map(([address, token]) => (
        <TokenItem
          key={address}
          address={address as Address}
          token={token}
          onClick={onClick}
        />
      ))}
    </div>
  );
};
