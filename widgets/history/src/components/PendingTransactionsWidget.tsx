import { FunctionComponent } from "preact";
import { Icon } from "@dwidget/shared/components";
import { deepLinkDappNative } from "@dwidget/shared/utils";
import { FilterStatus } from "@dwidget/shared/proto/history";

import { HISTORY_DAPP_URL } from "@/constants";

export const PendingTransactionsWidget: FunctionComponent = () => {
  return (
    <div
      className="h-[72px] bg-primary-container rounded-2xl flex-col justify-center items-center flex"
      onClick={() =>
        window.open(
          deepLinkDappNative(
            `${HISTORY_DAPP_URL}?status=${FilterStatus.PENDING}`
          ),
          "_blank"
        )
      }
    >
      <div className="self-stretch grow shrink basis-0 pl-4 pr-6 py-2 justify-center items-center gap-4 flex">
        <div className="justify-center items-center flex">
          <Icon name="hourglass" className="w-6 h-6 relative" />
        </div>
        <div className="grow shrink basis-0 self-stretch flex-col justify-center items-start flex">
          <div className="self-stretch text-zinc-900 text-base font-normal font-['Roboto'] leading-normal tracking-wide">
            Pending transactions
          </div>
          <div className="self-stretch h-5 text-zinc-700 text-sm font-normal font-['Roboto'] leading-tight tracking-tight">
            0 transactions
          </div>
        </div>
        <div className="justify-start items-center gap-2.5 flex">
          <Icon name="arrow_right" className="w-6 h-6 relative" />
        </div>
      </div>
    </div>
  );
};
