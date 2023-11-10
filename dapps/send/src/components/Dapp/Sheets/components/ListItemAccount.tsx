import { FunctionComponent, useMemo } from "preact/compat";
import truncateEthAddress from "truncate-eth-address";
import { Address } from "wagmi";

import { ListItem, ListItemProps } from "./ListItem";

interface Props extends Omit<ListItemProps, "label" | "value"> {
  address?: Address;
  label?: string;
}

export const ListItemAccount: FunctionComponent<Props> = ({
  address,
  label,
  onClick,
}) => {
  const account = useMemo(() => {
    if (!address) {
      return "Unknown account";
    } else {
      return truncateEthAddress(address);
    }
  }, [address]);

  return (
    <ListItem
      label={label ?? "From account"}
      value={account}
      onClick={onClick}
    />
  );
};
