import { FunctionComponent } from "preact";
import truncateEthAddress from "truncate-eth-address";
import { Address } from "wagmi";

interface Props {
  address: Address;
  onClick: (address: Address) => void;
}

export const AddressItem: FunctionComponent<Props> = ({ address, onClick }) => {
  return (
    <div className="p-6 pl-4 cursor-pointer" onClick={() => onClick(address)}>
      <div className="text-on-surface text-base font-normal font-['Roboto'] leading-normal tracking-wide ">
        {truncateEthAddress(address)}
      </div>
    </div>
  );
};
