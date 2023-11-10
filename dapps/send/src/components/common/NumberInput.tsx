import { VNode } from "preact";
import {
  ChangeEvent,
  HTMLProps,
  useEffect,
  useRef,
  useState,
} from "preact/compat";
import { formatUnits, parseUnits } from "viem";
import Decimal from "decimal.js";

export type BigNumberInputProps = {
  decimals: number;
  value: string;
  onChange: (value: string) => void;
  renderInput?: (props: HTMLProps<HTMLInputElement>) => VNode;
  autofocus?: boolean;
  placeholder?: string;
  max?: string;
  min?: string;
};

export function BigNumberInput({
  decimals,
  value,
  onChange,
  renderInput,
  autofocus,
  placeholder = "0.00",
  max,
  min,
}: BigNumberInputProps) {
  const inputRef = useRef<any>(null);

  const [inputValue, setInputvalue] = useState("");

  // update current value
  useEffect(() => {
    if (!value) {
      setInputvalue("");
    } else {
      let parseInputValue: BigInt;

      try {
        parseInputValue = parseUnits(inputValue || "0", decimals);
      } catch {
        // do nothing
      }

      // @ts-ignore
      if (!parseInputValue || parseInputValue !== BigInt(value)) {
        setInputvalue(formatUnits(BigInt(value), decimals));
      }
    }
  }, [value, decimals, inputValue]);

  useEffect(() => {
    if (!renderInput && autofocus && inputRef) {
      const node = inputRef.current as HTMLInputElement;
      node.focus();
    }
  }, [autofocus, inputRef]);

  const updateValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    if (value === "") {
      onChange(value);
      setInputvalue(value);
      return;
    }

    let newValue: Decimal;
    try {
      newValue = new Decimal(parseUnits(value, decimals).toString());
    } catch (e) {
      // don't update the input on invalid values
      return;
    }

    const invalidValue = (min && newValue.lt(min)) || (max && newValue.gt(max));
    if (invalidValue) {
      return;
    }

    setInputvalue(value);
    onChange(newValue.toString());
  };

  const inputProps = {
    placeholder,
    onChange: updateValue,
    type: "text",
    value: inputValue,
  };

  return renderInput ? (
    renderInput({ ...inputProps })
  ) : (
    <input {...inputProps} ref={inputRef} />
  );
}
