import { FunctionComponent } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import { useEnsAddress, Address } from "wagmi";
import { isAddress } from "viem";
import { useDebounce } from "use-debounce";

import { Icon } from "@/components/common/Icon";
import { AddressList } from "./AddressList";
import { Button } from "@/components/common/Button";
import { isValidENS } from "./utils";

interface Props {
  recepient?: Address;
  onSave: (address: Address) => void;
}

// TOOD: look at this https://codesandbox.io/s/xstate-debounce-example-7i9mw?file=/src/App.js:2154-2183
export const Form: FunctionComponent<Props> = ({ recepient, onSave }) => {
  const [nameOrAddress, setNameOrAddress] = useState<
    Address | string | undefined
  >(recepient);
  const [address, setAddress] = useState<Address | undefined>();

  const [debouncedNameOrAddress] = useDebounce(nameOrAddress, 500);
  const { data } = useEnsAddress({
    name: debouncedNameOrAddress,
    enabled: isValidENS(debouncedNameOrAddress),
  });

  const handleChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setNameOrAddress(value);

    if (isAddress(value)) {
      setAddress(value);
    }
  };

  const handleChooseClick = useCallback(
    (address: Address) => {
      setAddress(address);
    },
    [setAddress]
  );

  const handleClearClick = () => {
    setNameOrAddress("");
  };

  const handleSaveClick = useCallback(() => {
    if (address) {
      onSave(address);
    }
  }, [address, onSave]);

  const addresses = useMemo(() => {
    if (debouncedNameOrAddress && isAddress(debouncedNameOrAddress)) {
      return [debouncedNameOrAddress as Address];
    } else if (data) {
      return [data];
    } else {
      return [];
    }
  }, [debouncedNameOrAddress, data]);

  return (
    <div className="flex flex-col grow justify-between overflow-y-auto">
      <div className="px-4">
        <div className="px-4 flex-col gap-3 flex">
          <div className="bg-[#E6EEFF] rounded-[28px] flex-col flex divide-y divide-outline">
            <div className="h-14 p-1 rounded-tl-[28px] rounded-tr-[28px] justify-center items-center gap-1 inline-flex">
              <div className="h-12 flex-col justify-center items-center gap-2.5 inline-flex">
                <div className="gap-2.5 inline-flex">
                  <div className="p-2 gap-2.5 flex">
                    <Icon
                      name="arrow_back"
                      className="w-6 h-6 relative text-on-surface-variant"
                    />
                  </div>
                </div>
              </div>
              <div className="grow flex-col justify-center gap-2.5 inline-flex">
                <div className="h-6 py-2.5 items-center gap-px inline-flex">
                  <input
                    placeholder="Nickname or public key"
                    value={nameOrAddress}
                    onChange={handleChange}
                    className="inline-flex grow bg-transparent outline-none text-on-surface text-base font-normal font-['Roboto'] leading-normal tracking-wide"
                  />
                </div>
              </div>

              {nameOrAddress ? (
                <div
                  className="justify-center items-center flex cursor-pointer"
                  onClick={handleClearClick}
                >
                  <div className="p-1">
                    <div className="p-2 flex">
                      <Icon
                        name="close"
                        className="w-6 h-6 relative text-on-surface-variant"
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <AddressList addresses={addresses} onClick={handleChooseClick} />
          </div>
        </div>
      </div>

      <Button
        className="mx-4 mb-4"
        disabled={!address || !isAddress(address)}
        onClick={handleSaveClick}
      >
        Save
      </Button>
    </div>
  );
};
