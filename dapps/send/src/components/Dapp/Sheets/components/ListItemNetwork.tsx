import { FunctionComponent, useMemo } from "preact/compat";
import { Chain } from "wagmi";
import {
  ListItem,
  ListItemProps,
} from "@dwidget/shared-dapp/components/ListItem";

interface Props extends Omit<ListItemProps, "label" | "value"> {
  network?: Chain;
}

export const ListItemNetwork: FunctionComponent<Props> = ({
  network,
  onClick,
}) => {
  const name = useMemo(() => {
    if (!network) {
      return "Unknown network";
    } else {
      return network.name;
    }
  }, [network]);

  return <ListItem label="Network" value={name} onClick={onClick} />;
};
