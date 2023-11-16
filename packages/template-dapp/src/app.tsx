import { Widget } from "./components/Dapp";
import { Providers } from "./providers";

export function App() {
  return (
    <Providers>
      <Widget />
    </Providers>
  );
}
