import { useRef, useState } from "preact/hooks";
import { useAccount, useBalance } from "wagmi";
import { Icon } from "../../../common/Icon";
import { store } from "../../store";
import { FunctionComponent } from "preact";
import { TokenContext } from "@/machines";
import { observer } from "@legendapp/state/react";

const MIN_WIDTH = "1ch";

interface Props {
  token?: TokenContext;
}

export const Form: FunctionComponent<Props> = observer(({ token }) => {
  const { address } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address,
    token: token?.address,
  });

  const [width, setWidth] = useState(MIN_WIDTH);
  const span = useRef<HTMLSpanElement>(null);

  const amount = store.amount.get();

  const handleAmountChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setWidth(`${value.length}ch`);
    store.amount.set(`${value}`);
  };

  const handleClearAmountClick = () => {
    setWidth(`0ch`);
    store.amount.set("");
  };

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;

  return (
    <>
      <div className="h-[164px] flex-col justify-center items-center flex">
        <div className="px-5 py-[18px] justify-center items-center gap-2.5 flex">
          <div className="justify-start items-center gap-3 flex">
            <div className="text-on-surface-variant text-sm font-medium font-['Roboto'] leading-tight">
              Balance {data?.formatted} {data?.symbol}
            </div>
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
                style={{ width, minWidth: MIN_WIDTH }}
                className="outline-none self-stretch text-right text-on-primary-container text-[45px] font-normal font-['Roboto'] leading-[52px]"
                onChange={handleAmountChange}
              />
              <span className="self-stretch text-center text-on-primary-container text-[45px] font-normal font-['Roboto'] leading-[52px]">
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
              $425.56
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
