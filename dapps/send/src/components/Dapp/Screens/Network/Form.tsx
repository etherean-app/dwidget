import { RadioGroup } from "@/components/common/RadioGroup";
import { FunctionComponent } from "preact";

const elements = [
  { label: "Mainnet", value: "mainnet" },
  { label: "Goerli", value: "goerli" },
  { label: "Sepolia", value: "sepolia" },
];

interface Props {
  value: string;
  onChange: (network: string) => void;
}

export const Form: FunctionComponent<Props> = ({ value, onChange }) => {
  return (
    <div className="px-4">
      <RadioGroup
        label="Network"
        elements={elements}
        value={value}
        onValueChange={onChange}
      />
    </div>
  );
};
