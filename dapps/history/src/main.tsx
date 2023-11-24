import { render } from "preact";
import { inspect } from "@xstate/inspect";

import { App } from "./app.tsx";
import "./index.css";

inspect({
  iframe: false, // open in new window
  serialize: (_, v) => (v === "bigint" ? v.toString() : v),
});

render(<App />, document.getElementById("app")!);
