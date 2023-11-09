import { ComponentChildren, FunctionComponent } from "preact";
import { Drawer } from "vaul";

import { Icon } from "../../../common/Icon";

interface Props {
  trigger?: ComponentChildren;
  open?: boolean;
  onClose?: () => void;
  icon: string;
  title: string;
  children: ComponentChildren;
}

export const Sheet: FunctionComponent<Props> = ({
  trigger,
  open,
  onClose,
  icon,
  title,
  children,
}) => {
  return (
    <Drawer.Root open={open} onClose={onClose}>
      {trigger ? <Drawer.Trigger asChild>{trigger}</Drawer.Trigger> : null}
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1 flex-shrink-0 rounded-full bg-outline mb-4" />
            <div className="max-w-md mx-auto">
              <Icon name={icon} className="w-6 h-6 mb-4" />
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
