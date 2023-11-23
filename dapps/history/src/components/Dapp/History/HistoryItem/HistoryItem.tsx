import { FunctionalComponent } from "preact";
import { useMemo } from "preact/hooks";
import { memo } from "preact/compat";
import { EntryCategory, HistoryEntry } from "@dwidget/shared/proto/history";
import { fiatMoneyToString } from "@dwidget/shared/utils";

import { nameMap } from "@/utils";
import { HistoryIcon } from "./HistoryIcon";
import { HistoryContent, HistoryContentProps } from "./HistoryContent";

const notImlemented = (entry: HistoryEntry) => ({
  top: nameMap[entry.category],
  bottom: "",
  right: "",
});

const needData = (entry: HistoryEntry) => ({
  ...notImlemented(entry),
});

export const contentMap: {
  [key in EntryCategory]: (entry: HistoryEntry) => HistoryContentProps;
} = {
  [EntryCategory.APPROVED]: notImlemented,
  [EntryCategory.BORROWED]: notImlemented,
  [EntryCategory.BURNED]: notImlemented,
  [EntryCategory.CANCELLED]: notImlemented,
  [EntryCategory.CLAIMED]: notImlemented,
  [EntryCategory.DEPLOYED]: notImlemented,
  [EntryCategory.DEPOSITED]: notImlemented,
  [EntryCategory.EXECUTED]: notImlemented,
  [EntryCategory.MINTED]: notImlemented,
  [EntryCategory.RECEIVED]: needData,
  [EntryCategory.REPAID]: notImlemented,
  [EntryCategory.SENT]: notImlemented,
  [EntryCategory.STAKED]: notImlemented,
  [EntryCategory.SWAPPED]: (entry) => ({
    top: "Swap",
    bottom: `${entry.transfers[0].token?.symbol}→${entry.transfers[1].token?.symbol}`,
    right: `$ ${fiatMoneyToString(entry.transfers[1].amount?.fiatAmount)}`,
  }),
  [EntryCategory.UNSTAKED]: notImlemented,
  [EntryCategory.WITHDRAWN]: notImlemented,
  [EntryCategory.UNSPECIFIED]: notImlemented,
};

interface Props {
  entry: HistoryEntry;
  onClick: (entry: HistoryEntry) => void;
}

const HistoryItemOriginal: FunctionalComponent<Props> = ({
  entry,
  onClick,
}) => {
  // if ((entry.category) === EntryCategory.Sent) console.log(entry);

  const content = useMemo(
    (): HistoryContentProps => contentMap[entry.category](entry),
    [entry]
  );

  return (
    <div
      className="h-16 flex flex-col justify-center cursor-pointer"
      onClick={() => onClick(entry)}
    >
      <div className="h-16 pl-4 pr-6 py-1 inline-flex justify-center items-center gap-4 ">
        <div className="justify-center items-center flex">
          <HistoryIcon category={entry.category} />
        </div>
        <HistoryContent {...content} />
      </div>
    </div>
  );
};

export const HistoryItem = memo(HistoryItemOriginal);
