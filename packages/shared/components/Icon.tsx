import { FunctionalComponent } from "preact";
import { HTMLProps } from "preact/compat";
import { MaterialSymbol } from "material-symbols";

import { cn } from "./../utils";

interface Props extends HTMLProps<HTMLSpanElement> {
  name: MaterialSymbol;
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
