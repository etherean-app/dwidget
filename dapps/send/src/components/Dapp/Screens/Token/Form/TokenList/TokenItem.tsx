import { FunctionComponent } from "preact";
import { TokenAsset } from "@dwidget/shared/proto/assets";
import { TokenContext } from "@/machines";

interface Props {
  address: string;
  token: TokenAsset;
  onClick: (token: TokenContext) => void;
}

export const TokenItem: FunctionComponent<Props> = ({
  address,
  token,
  onClick,
}) => {
  return (
    <div
      className="flex pl-4 pr-6 py-3 items-center gap-4 cursor-pointer"
      onClick={() => onClick({ address, asset: token })}
    >
      <div className="flex-col justify-center">
        <img
          className="w-10 h-10 relative rounded-[100px]"
          src={token.meta?.logo}
        />
      </div>
      <div className="grow flex-col justify-center">
        <div className="text-on-surface-variant text-xs font-medium font-['Roboto'] leading-none tracking-wide">
          {token.meta?.name}
        </div>
        <div className="text-on-surface text-base font-normal font-['Roboto'] leading-normal tracking-wide">
          {token.meta?.symbol}
        </div>
      </div>
      <div className="text-right text-on-surface-variant text-[11px] font-medium font-['Roboto'] leading-none tracking-wide">
        {token.amount?.uiAmount?.value} {token.meta?.symbol}
      </div>
    </div>
  );
};
