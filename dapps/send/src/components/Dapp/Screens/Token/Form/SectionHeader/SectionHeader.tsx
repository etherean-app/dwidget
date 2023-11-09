import { FunctionComponent } from "preact";

interface Props {
  title: string;
}

export const SectionHeader: FunctionComponent<Props> = ({ title }) => {
  return (
    <div className="px-4 py-[18px] text-on-surface-variant text-sm font-medium leading-tight tracking-tight">
      {title}
    </div>
  );
};
