import { ComponentChildren } from "preact";
import { createActorContext } from "@xstate/react";

import { machine } from "../machines";

const StateMachineContext = createActorContext(machine);

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

export function useStateMachineRef() {
  const context = StateMachineContext.useActorRef();
  if (context === undefined) {
    throw new Error(
      "useStateMachine must be used within a StateMachineProvider"
    );
  }
  return context;
}
