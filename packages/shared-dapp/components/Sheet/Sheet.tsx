import { ComponentChildren, FunctionComponent } from "preact";
import { Drawer } from "vaul";
import { MaterialSymbol } from "material-symbols";
import { Icon } from "@dwidget/shared/components";
import { cn } from "@dwidget/shared/utils";

interface Props {
  trigger?: ComponentChildren;
  open?: boolean;
  onClose?: () => void;
  icon?: MaterialSymbol;
  iconClass?: string;
  title: ComponentChildren;
  dismissible?: boolean;
  children: ComponentChildren;
}

export const Sheet: FunctionComponent<Props> = ({
  trigger,
  open,
  onClose,
  icon,
  iconClass,
  title,
  dismissible = true,
  children,
}) => {
  return (
    <Drawer.Root open={open} onClose={onClose} dismissible={dismissible}>
      {trigger ? <Drawer.Trigger asChild>{trigger}</Drawer.Trigger> : null}
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-20" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 z-30">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div
              className={cn(
                "mx-auto w-12 h-1 flex-shrink-0 rounded-full bg-outline mb-4",
                {
                  invisible: !dismissible,
                }
              )}
            />
            <div className="max-w-md mx-auto">
              {icon ? (
                <Icon name={icon} className={cn("w-6 h-6 mb-4", iconClass)} />
              ) : null}
              <Drawer.Title className="text-[22px] font-normal font-['Roboto'] leading-7 mb-[18px]">
                {title}
              </Drawer.Title>
              {children}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
