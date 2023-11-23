import { FunctionalComponent } from "preact";
import { HTMLProps } from "preact/compat";
import { MaterialSymbol } from "material-symbols";
import { Icon } from "@dwidget/shared/components";

interface Props extends Pick<HTMLProps<HTMLDivElement>, "onClick"> {
  label: string;
  value: string;
  icon?: MaterialSymbol;
}

export const DetailsItem: FunctionalComponent<Props> = ({
  label,
  value,
  icon,
  ...props
}) => {
  return (
    <div
      className={"h-[72px] flex-col justify-center items-center flex"}
      {...props}
    >
      <div className="self-stretch grow shrink basis-0 pl-4 pr-6 py-2 justify-start items-center gap-4 inline-flex">
        <div className="grow shrink basis-0 self-stretch flex-col justify-center items-start inline-flex">
          <div className="self-stretch text-on-surface-variant text-xs font-medium font-['Roboto'] leading-none tracking-wide">
            {label}
          </div>
          <div className="self-stretch text-on-surface text-base font-normal font-['Roboto'] leading-normal tracking-wide">
            {value}
          </div>
        </div>
        {props.onClick ? (
          <div className="justify-start items-start gap-2.5 flex">
            <Icon name={icon ?? "arrow_right"} className="w-6 h-6" />
          </div>
        ) : null}
      </div>
    </div>
  );
};
