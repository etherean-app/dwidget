import "./app.css";
import { Dapp } from "./components/Dapp";
import { Providers } from "./providers";

export function App() {
  return (
    <Providers>
      <Dapp />
    </Providers>
  );
}
