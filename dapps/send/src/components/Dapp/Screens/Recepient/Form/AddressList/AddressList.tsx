import { FunctionComponent } from "preact";
import { Address } from "viem";
import { AddressItem } from "./AddressItem";

interface Props {
  addresses: Address[];
  onClick: (address: Address) => void;
}

export const AddressList: FunctionComponent<Props> = ({
  addresses,
  onClick,
}) => {
  if (!addresses.length) {
    return null;
  }

  return (
    <div className="flex-col divide-y divide-outline-variant">
      {addresses.map((address) => (
        <AddressItem key={address} address={address} onClick={onClick} />
      ))}
    </div>
  );
};
