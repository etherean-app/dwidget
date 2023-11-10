import { FunctionComponent } from "preact";
import { RadioGroupItem, RadioGroupRoot } from "./RadioGroupPrimitives";

type ElementType = {
  label: string;
  value: string;
};

interface Props {
  label: string;
  elements: ElementType[];
  value?: string;
  onValueChange: (value: string) => void;
}

export const RadioGroup: FunctionComponent<Props> = ({
  label,
  elements,
  value,
  onValueChange,
}) => {
  return (
    <RadioGroupRoot
      className="flex flex-col bg-[#E6EEFF] rounded-[20px] divide-y divide-outline-variant"
      value={value}
      onValueChange={onValueChange}
      aria-label={label}
    >
      {elements.map((el) => (
        <div
          key={el.value}
          className="flex items-center justify-between py-2 pl-4 pr-6"
        >
          <label
            className="flex-1 py-4 mr-4 text-base text-on-surface-variant font-normal leading-normal tracking-wide"
            htmlFor={`r${el.value}`}
          >
            {el.label}
          </label>
          <RadioGroupItem value={el.value} id={`r${el.value}`} />
        </div>
      ))}
    </RadioGroupRoot>
  );
};
