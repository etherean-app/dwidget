import { ComponentChildren, FunctionComponent } from "preact";
import { w, W } from "windstitch";
import { cn } from "@dwidget/shared/utils/cn";

const Title = w.div("flex items-center h-[12px] leading-3 tracking-[0.066px]");

const Value = w.div(
  "flex items-center h-[22px] text-[15px] font-semibold tracking-[-.5px]",
  {
    variants: {
      color: {
        green: "text-emerald-500",
        default: "text-zinc-800",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

interface Props {
  color?: W.Infer<typeof Value>["color"];
  title: string;
  value: ComponentChildren;
  subvalue?: ComponentChildren;
  className?: string;
}

export const Column: FunctionComponent<Props> = ({
  color,
  title,
  value,
  subvalue,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex-col gap-0.5 flex font-['SF Pro Text'] font-normal text-slate-500 text-[11px]",
        className
      )}
    >
      <Title>{title}</Title>
      <Value color={color}>{value}</Value>
      {subvalue ? <Title>{subvalue}</Title> : null}
    </div>
  );
};
