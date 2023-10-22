import { FunctionComponent } from "preact";
import { w, W } from "windstitch";

const Title = w.div("leading-3 tracking-[0.066px]");

const Value = w.div("text-[15px] font-semibold tracking-[-.5px]", {
  variants: {
    color: {
      green: "text-emerald-500",
      default: "text-zinc-800",
    },
  },
  defaultVariants: {
    color: "default",
  },
});

interface Props {
  color?: W.Infer<typeof Value>["color"];
  title: string;
  value: string;
  subvalue?: string;
}

export const Column: FunctionComponent<Props> = ({
  color,
  title,
  value,
  subvalue,
}) => {
  return (
    <div className="flex-col justify-center items-start gap-0.5 inline-flex font-['SF Pro Text'] font-normal text-slate-500 text-[11px]">
      <Title>{title}</Title>
      <Value color={color}>{value}</Value>
      {subvalue ? <Title>{subvalue}</Title> : null}
    </div>
  );
};
