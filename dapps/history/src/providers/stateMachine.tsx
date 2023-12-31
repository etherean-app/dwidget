import { ComponentChildren } from "preact";
import { createActorContext } from "@xstate/react";

import { machine } from "../machines";

const StateMachineContext = createActorContext(machine, { devTools: false });

export function StateMachineProvider({
  children,
}: {
  children: ComponentChildren;
}) {
  return (
    <StateMachineContext.Provider>{children}</StateMachineContext.Provider>
  );
}

export function useStateMachine() {
  const context = StateMachineContext.useActor();
  if (context === undefined) {
    throw new Error(
      "useStateMachine must be used within a StateMachineProvider"
    );
  }
  return context;
}

export const useStateMachineSelector = StateMachineContext.useSelector;

export function useStateMachineRef() {
  const context = StateMachineContext.useActorRef();
  if (context === undefined) {
    throw new Error(
      "useStateMachine must be used within a StateMachineProvider"
    );
  }
  return context;
}
