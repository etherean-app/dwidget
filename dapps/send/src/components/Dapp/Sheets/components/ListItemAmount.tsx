import { FunctionComponent, useMemo } from "preact/compat";
import {
  ListItem,
  ListItemProps,
} from "@dwidget/shared-dapp/components/ListItem";

import { TokenContext } from "@/machines";

interface Props extends Omit<ListItemProps, "label" | "value"> {
  amount?: string;
  token?: TokenContext;
}

export const ListItemAmount: FunctionComponent<Props> = ({ amount, token }) => {
  const value = useMemo(() => {
    const symbol = token?.asset.meta?.symbol;
    if (!symbol) {
      return "Unknown token";
    } else if (!amount) {
      return "Amount missed";
    } else {
      return `${amount} ${symbol}`;
    }
  }, [amount, token]);

  return <ListItem label="Amount" value={value} />;
};
