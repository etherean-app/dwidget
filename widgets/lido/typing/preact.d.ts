import { ComponentChildren } from "preact";

declare module "preact" {
  namespace JSX {
    interface IntrinsicAttributes {
      children?: ComponentChildren;
      className?: string;
    }
  }
}
