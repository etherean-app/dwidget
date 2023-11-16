import { FunctionComponent, useMemo } from "preact/compat";
import {
  ListItem,
  ListItemProps,
} from "@dwidget/shared-dapp/components/ListItem";

import { TokenContext } from "@/machines";

interface Props extends Omit<ListItemProps, "label" | "value"> {
  token?: TokenContext;
}

export const ListItemToken: FunctionComponent<Props> = ({ token, onClick }) => {
  const symbol = useMemo(() => {
    if (!token) {
      return "Choose token";
    } else if (!token.asset.meta || !token.asset.meta.symbol) {
      return "Unknown symbol";
    } else {
      return token.asset.meta.symbol;
    }
  }, [token]);

  return <ListItem label="Token" value={symbol} onClick={onClick} />;
};
