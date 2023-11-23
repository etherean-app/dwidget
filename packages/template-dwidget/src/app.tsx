import "./app.css";
import { Widget } from "./components/Widget";
import { Providers } from "./providers";

export function App() {
  return (
    <Providers>
      <Widget />
    </Providers>
  );
}
