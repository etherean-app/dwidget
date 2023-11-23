import { ComponentChildren } from "preact";
import { forwardRef, HTMLProps } from "preact/compat";
import { w, W } from "windstitch";

const ButtonWrapper = w.button(
  "h-14 py-2 flex-col justify-center items-center gap-2 flex cursor-pointer",
  {
    variants: {
      color: {
        primary: "interactive-bg-primary rounded-[100px]",
        hollow: "text-primary",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  }
);

type ButtonWrapperProps = W.Infer<typeof ButtonWrapper> &
  HTMLProps<HTMLButtonElement>;

interface Props extends ButtonWrapperProps {
  children: ComponentChildren;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <ButtonWrapper ref={ref} className={className} {...props}>
        <div className="self-stretch h-10 px-6 py-2.5 justify-center items-center gap-2 inline-flex">
          <div className="text-center text-sm font-medium font-['Roboto'] leading-tight tracking-tight">
            {children}
          </div>
        </div>
      </ButtonWrapper>
    );
  }
);
