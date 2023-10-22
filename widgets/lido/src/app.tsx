import { Lido } from "./components/Lido";
import { Providers } from "./providers";

export function App() {
  return (
    <Providers>
      <Lido />
    </Providers>
  );
}
