import { useRef, useState } from "preact/hooks";
import { Address, useBalance } from "wagmi";
import { Icon } from "@dwidget/shared/components";
import { FunctionComponent } from "preact";
import { TokenContext } from "@/machines";
import { fiatMoneyToString } from "@dwidget/shared/utils";

function downscale(
  length: number,
  expectedMaxLength: number,
  baseFontSize: number,
  minFontSize: number
) {
  const scalingFactor = 1 - Math.min((1 / expectedMaxLength) * length, 1);
  return Math.ceil(
    Math.max(
      scalingFactor * (baseFontSize - minFontSize) + minFontSize,
      minFontSize
    )
  );
}

const MIN_WIDTH = "1ch";
const REGEX_AMOUNT = /^(\d+(\.\d*)?|\.|)$/;

interface Props {
  address?: Address;
  token?: TokenContext;
  amount: string;
  onChange: (amount: string) => void;
}

export const Form: FunctionComponent<Props> = ({
  address,
  token,
  amount,
  onChange,
}) => {
  const { data, isError, isLoading } = useBalance({
    address,
    token:
      address && token && address !== token.address ? token.address : undefined,
    enabled: !!token,
  });

  const [width, setWidth] = useState(MIN_WIDTH);
  const [fontSize, setFontSize] = useState(45);
  const span = useRef<HTMLSpanElement>(null);

  const changeAmount = (amount: string) => {
    setWidth(`${amount.length}ch`);
    onChange(`${amount}`);
    setFontSize(downscale(amount.length, 36, 45, 11));
  };

  const handleAmountChange = (e: Event) => {
    let nextValue = (e.target as HTMLInputElement).value;

    if (REGEX_AMOUNT.test(nextValue)) {
      nextValue = nextValue.replace(/^0(\d+)/, "$1");
      if (nextValue === ".") {
        nextValue = "0.";
      }

      changeAmount(nextValue);
    } else {
      changeAmount(amount);
    }
  };

  const handleClearAmountClick = () => {
    changeAmount("");
  };

  const handleMaxClick = () => {
    if (data) {
      changeAmount(data.formatted);
    }
  };

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;

  return (
    <>
      <div className="h-[164px] flex-col justify-center items-center flex">
        <div className="px-5 py-[18px]">
          <div
            className="text-on-surface-variant text-sm font-medium font-['Roboto'] leading-tight"
            onClick={handleMaxClick}
          >
            Balance {data?.formatted} {data?.symbol}
          </div>
        </div>
        <div className="self-stretch pr-5 justify-center items-center flex">
          <div className="pl-12 pr-4 flex-col justify-center items-center gap-[7px] flex">
            <label className="justify-center items-center gap-[7px] flex">
              <span ref={span} className="hidden">
                {amount}
              </span>
              <input
                type="text"
                autoFocus
                placeholder="0"
                value={amount}
                style={{ width, minWidth: MIN_WIDTH, fontSize }}
                className="outline-none self-stretch text-right text-on-primary-container font-normal font-['Roboto'] leading-[52px]"
                onChange={handleAmountChange}
              />
              <span className="self-stretch text-center text-on-primary-container font-normal font-['Roboto'] leading-[52px]">
                {data?.symbol}
              </span>
            </label>
          </div>
          {amount ? (
            <Icon
              name="cancel"
              className="text-primary w-6 h-6 cursor-pointer"
              onClick={handleClearAmountClick}
            />
          ) : null}
        </div>
        <div className="px-5 py-[18px] justify-center items-center gap-2.5 flex">
          <div className="justify-start items-center gap-3 flex">
            <div className="text-on-surface-variant text-sm font-medium font-['Roboto'] leading-tight">
              ${fiatMoneyToString(token?.asset.price?.exchangeRate)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
