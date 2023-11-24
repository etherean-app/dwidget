import { FunctionalComponent } from "preact";
import truncateEthAddress from "truncate-eth-address";
import { HistoryEntry } from "@dwidget/shared/proto/history";
import { deepLinkDapp } from "@dwidget/shared/utils";

import { DetailsItem } from "./DetailsItem";

interface Props {
  entry?: HistoryEntry;
}

export const Details: FunctionalComponent<Props> = ({ entry }) => {
  if (!entry) return <div>Transaction not found</div>;

  return (
    <div className="flex flex-col bg-[#E6EEFF] rounded-[20px] divide-y divide-outline-variant">
      {entry?.txHash ? (
        <DetailsItem
          label="ID"
          value={truncateEthAddress(entry.txHash.value)}
          icon="open_in_new"
          onClick={() => window.open(deepLinkDapp(entry.txUrl), "_blank")}
        />
      ) : null}
    </div>
  );
};
