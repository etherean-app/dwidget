// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.entries": {
      type: "done.invoke.entries";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.entry": {
      type: "done.invoke.entry";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.history.HISTORY.LOAD.loadMore:invocation[0]": {
      type: "done.invoke.history.HISTORY.LOAD.loadMore:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.entries": { type: "error.platform.entries"; data: unknown };
    "error.platform.entry": { type: "error.platform.entry"; data: unknown };
    "error.platform.history.HISTORY.LOAD.loadMore:invocation[0]": {
      type: "error.platform.history.HISTORY.LOAD.loadMore:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    fetchHistory:
      | "done.invoke.entries"
      | "done.invoke.history.HISTORY.LOAD.loadMore:invocation[0]";
    fetchHistoryEntry: "done.invoke.entry";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    saveAddress: "SET_ADDRESS";
    saveTxHash: "SET_TXHASH";
    setHistory: "done.invoke.entries";
    setHistoryEntry: "done.invoke.entry";
    setHistoryEntryError: "error.platform.entry";
    setHistoryError:
      | "error.platform.entries"
      | "error.platform.history.HISTORY.LOAD.loadMore:invocation[0]";
    setMoreHistory: "done.invoke.history.HISTORY.LOAD.loadMore:invocation[0]";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    hasMoreHistory: "FETCH_HISTORY_MORE";
  };
  eventsCausingServices: {
    fetchHistory: "FETCH_HISTORY" | "FETCH_HISTORY_MORE" | "SET_ADDRESS";
    fetchHistoryEntry:
      | "FETCH_HISTORY_ENTRY"
      | "SET_TXHASH"
      | "retryHistoryEntry";
  };
  matchesStates:
    | "DETAILS"
    | "DETAILS.failure"
    | "DETAILS.idle"
    | "DETAILS.loading"
    | "DETAILS.success"
    | "HISTORY"
    | "HISTORY.LOAD"
    | "HISTORY.LOAD.loadMore"
    | "HISTORY.LOAD.loading"
    | "HISTORY.failure"
    | "HISTORY.idle"
    | "HISTORY.success"
    | {
        DETAILS?: "failure" | "idle" | "loading" | "success";
        HISTORY?:
          | "LOAD"
          | "failure"
          | "idle"
          | "success"
          | { LOAD?: "loadMore" | "loading" };
      };
  tags: never;
}
