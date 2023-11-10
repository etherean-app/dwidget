// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    saveAddress: "SET_ADDRESS";
    saveNetwork: "SET_NETWORK" | "backNetwork";
    saveRecepient: "backRecepient";
    saveToken: "backToken";
    setAmount: "SET_AMOUNT";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    isReadyForSend: "send";
    isReadyForSubmit: "transactionPreview" | "transactionSubmitted";
  };
  eventsCausingServices: {};
  matchesStates:
    | "NETWORK"
    | "RECEPIENT"
    | "SEND_TOKEN"
    | "SEND_TOKEN.SEND"
    | "SEND_TOKEN.SEND_TOKEN"
    | "SEND_TOKEN.TRANSACTION_DETAILS"
    | "TOKEN"
    | "TRANSACTION_PREVIEW"
    | "TRANSACTION_SUBMITTED"
    | { SEND_TOKEN?: "SEND" | "SEND_TOKEN" | "TRANSACTION_DETAILS" };
  tags: never;
}
