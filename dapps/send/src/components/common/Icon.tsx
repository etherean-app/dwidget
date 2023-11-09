import { FunctionalComponent } from "preact";
import { HTMLProps } from "preact/compat";
import { cn } from "@dwidget/shared/utils";

interface Props extends HTMLProps<HTMLSpanElement> {
  name: string;
  className?: string;
}

export const Icon: FunctionalComponent<Props> = ({
  name,
  className,
  ...props
}) => {
  return (
    <span className={cn("material-symbols-outlined", className)} {...props}>
      {name}
    </span>
  );
};
