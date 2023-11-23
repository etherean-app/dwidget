import { FunctionalComponent } from "preact";
import { MaterialSymbol } from "material-symbols";
import { Icon } from "@dwidget/shared/components";
import { EntryCategory } from "@dwidget/shared/proto/history";


const iconMap: { [category in EntryCategory]: MaterialSymbol } = {
  [EntryCategory.APPROVED]: "done",
  [EntryCategory.BORROWED]: "arrow_downward",
  [EntryCategory.BURNED]: "whatshot",
  [EntryCategory.CANCELLED]: "close",
  [EntryCategory.CLAIMED]: "arrow_downward",
  [EntryCategory.DEPLOYED]: "arrow_upward",
  [EntryCategory.DEPOSITED]: "arrow_upward",
  [EntryCategory.EXECUTED]: "done",
  [EntryCategory.MINTED]: "arrow_downward",
  [EntryCategory.RECEIVED]: "arrow_downward",
  [EntryCategory.REPAID]: "arrow_downward",
  [EntryCategory.SENT]: "arrow_upward",
  [EntryCategory.STAKED]: "arrow_upward",
  [EntryCategory.SWAPPED]: "cached",
  [EntryCategory.UNSTAKED]: "arrow_downward",
  [EntryCategory.WITHDRAWN]: "arrow_upward",
  [EntryCategory.UNSPECIFIED]: "help",
};

interface Props {
  category: EntryCategory;
}

export const HistoryIcon: FunctionalComponent<Props> = ({ category }) => {
  const name = iconMap[category] ?? iconMap[EntryCategory.UNSPECIFIED];
  return <Icon name={name} className="w-6 h-6" />;
};
