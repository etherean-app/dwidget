import { cn } from "@dwidget/shared/utils/cn";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import {
  RadioGroupItemProps,
  RadioGroupProps,
} from "@radix-ui/react-radio-group";
import { ComponentChildren } from "preact";
import { forwardRef, HTMLProps } from "preact/compat";

const RadioGroupRoot = forwardRef<
  HTMLDivElement,
  RadioGroupProps &
    HTMLProps<HTMLDivElement> & {
      className: string;
    }
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root className={className} {...props} ref={ref} />
  );
});
RadioGroupRoot.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = forwardRef<
  HTMLButtonElement,
  RadioGroupItemProps &
    HTMLProps<HTMLButtonElement> & {
      className: string;
      children: ComponentChildren;
    }
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "w-4 h-4 rounded-full shadow-[0_0_0_2px] shadow-primary outline-none cursor-default",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-primary" />
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroupRoot, RadioGroupItem };
