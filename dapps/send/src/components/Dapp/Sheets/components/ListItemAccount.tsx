import { FunctionComponent, useMemo } from "preact/compat";
import truncateEthAddress from "truncate-eth-address";
import { useAccount } from "wagmi";
import { Address } from "viem";

import { ListItem, ListItemProps } from "./ListItem";

interface Props extends Omit<ListItemProps, "label" | "value"> {
  label?: string;
}

export const ListItemAccount: FunctionComponent<Props> = ({
  label,
  onClick,
}) => {
  const { address } = useAccount();

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
