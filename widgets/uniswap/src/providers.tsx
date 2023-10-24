// TODO: uncomment and use own proto clients
import { ComponentChildren, FunctionComponent } from "preact";
import { WagmiProvider } from "@dwidget/shared/providers";

interface Props {
  children: ComponentChildren;
}

export const Providers: FunctionComponent<Props> = ({ children }) => {
  return <WagmiProvider>{children}</WagmiProvider>;
};
