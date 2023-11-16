import { FunctionComponent, useMemo } from "preact/compat";
import { Address } from "wagmi";
import truncateEthAddress from "truncate-eth-address";
import {
  ListItem,
  ListItemProps,
} from "@dwidget/shared-dapp/components/ListItem";

interface Props extends Omit<ListItemProps, "label" | "value"> {
  recepient?: Address;
}

export const ListItemRecepient: FunctionComponent<Props> = ({
  recepient,
  onClick,
}) => {
  const address = useMemo(() => {
    if (!recepient) {
      return "Choose recepient";
    } else {
      return truncateEthAddress(recepient);
    }
  }, [recepient]);

  return <ListItem label="Recepient" value={address} onClick={onClick} />;
};
