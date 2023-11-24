import { Address } from "wagmi";
import { createMachine, assign } from "xstate";
import type { TransactionId } from "@dwidget/shared/proto/transaction";
import { ChainID } from "@dwidget/shared/proto/chain_id";
import {
  Cursor,
  HistoryResponse,
  HistoryEntry,
  HistoryEntryResponse,
  Filter,
  FilterStatus,
} from "@dwidget/shared/proto/history";

import { getHistory, getHistoryEntry } from "@/hooks";
import { HISTORY_LIMIT } from "@/constants";
import { safeCall } from "./utils";

const INITIAL_HISTORY = {
  filter: undefined,
  entries: [],
  cursor: undefined,
  error: undefined,
};

type HistoryContext = {
  filter?: Filter;
  entries: HistoryEntry[];
  cursor?: Cursor;
  error?: string | null;
};

type HistoryEntryContext = {
  entry?: HistoryEntry;
  error?: string | null;
};

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAsCWsAuB7ATgTwGIBlAUQBUB9AQQBEaAlEoogbQAYBdRUABy1lQZUWAHbcQAD0QBaABwB2AIwA6AGxtFbWQCYAnABZVAZlWzZAGhB4Zi-crbbtRo3sUBWNvIOzFAX1+WaJi4hKSUZAAaABJURFHsXEggfAJCouJSCF5GyvpmRrJsqqry+qVGltYI0l7KRm4NRgaG8mby8v6B6Nj4xOQUAGIAkgAyZCT0CeIpgsJiSZk16vatsvomPhq62pUyurp1+vrNOoryTaranSBBPXjKUUNEZADy9ACayqgQADZgBANyABhKIUR7PN7vKZJGZpeagRZuJTKWRGNi6RQKUxaPK7aqqNy5NxObRlRS6HzbXTXW4hB5PV4fZQjF60ZQ-LAAQwgqBEUAIEFEYC+IgAblgANbCsAiDA4VBwaG8fizdILGQmVTKTF5UoOdqFVR47RuWQo2xsYmKRxrXQdAI3bp08GMz4stkc7m8-lgHA4XDKHg-TkYABmuAAtsoZXKFbAlckVXCMjJHPJtQ0ynpjGddG4jVZECazT59JbtNbtLbZDSnfh6RCme6aOyuRAALK4f6CkTC3niqXKWn1l2Q5msluejtdhD9rAAYxDcwSCdhcxT1TOKPLjkubH0poaxtN5v0mk0bBMTSMteCI4ZY+bre5nZw-19-pwgeDYcjQ7r9yjk2E7PtOb6zmKC5LqIK6cNMSbruqCDuNouTomexi6roRiGMeJa2OebCXsY2y3ncDausosAAK7zvOcCwACwKgkBUJwTCCFqgiMhlHY6hmJaLgmMclp4oYhIHrIlzbNoJTorJZHOg+TI0XRDFMWQIJgsp7wUO2bwkKunHwpIiAFDkLQVm4+zyKoBglHi2zKPIjiaM4nhaEiVwOsOgE6cooacqgPzUW+BDzhysBgFEAEDEFIVvkZqSIdx1SmmwuQYvuJRKNhGh4kiZpVrJxylto8huDePkARRY6BcFoX-G+cp4DFd54ElqomYsdrKLoRH6KSBJFC4TgFc49hoqoZQUhedqKfWNDkFQoxEOFkXRQBJCyvgnXJkhtjHGo-H9UJbR4tI7iEtsBqydoRStAt9xLWQK0jEQXy-P8gKaSxOkUCQAByZAfHtKWmchZxmtsxRlqSChuO4F2yAcmIYuoQ06OWT3KC9b0fVO3oCkKIoDtKO0dexyrJVxEMEYSGikvmFbYU0iiOddprWta8gOLq+g43jq2gUTH4BkGIbhjgUYxrtVOJjT3WIJWBw4XmBj5ojZhuBzfVcxW5V8woAvVe1uPLcL9UJU1YAtW1dzbS1YO05kF4ZbYazWdZl4VTshYIKS6aWscRi2URdnWYLFvvQF8WNet-Cbe1jv4HFDWJfLa4u8rWgHHmGjothtmHniUO5FJprOOssiFVVDoiFgEBwOIvnwYrG7SBiBzqJoOj2RsFj+9I7l9eVhTyaHEc46xbddR3lxmscmgtLlaLs0PTgHOh6hEelFXrNP-nfH8s-7al0jEjk4emHaZLGPIF3uCo1mGIzJFSX4pvkax460Kf4OLHqISZwrMvIo2wjrIeB4UQUkNi4FGqJEYmy6GbH+T5CZ8n-tnaoaJ0wgOcGA-Y9QxIqB7qYFyeQCh5hrF-JSjY3QgSnK+MAWClYICOsbXmXhVjDV0CQtQGhyHwyoaaQ+9Df4tluKwju-VtTUKXlJEoVlS5HSGgebYUkjBXXtCg7+-lVL0VgPADi7cDrAOKCUQazMKxEQqP7C4fVi4eHkj4EobgxGUSto1aRSE5Du1MCHeo2wkTEjxOodMGjQ7nGJEoYoUdXqrR8alPMqEPbqO9qHUJG91i5DHg4a0uhsSf10XSIWMdj4sJMXPA68M6hQ2xIUikj8Gij1aJeAh3tSjxPxiLTBVSz501JHxNYRw7IbE0A-DeKh2jnGDpVUoawaElMWtHD6BiGJJLpkcFQlp3AHlME0KSfsqiB3sG4EOYcijq26ZbOOb5Nmu3KlqWJXh9hlEEpAk5ZQzkXJ3hHNY-h-BAA */
    tsTypes: {} as import("./machine.typegen").Typegen0,

    schema: {
      context: {} as {
        address?: Address;
        txHash?: TransactionId;
        history: HistoryContext;
        historyEntry?: HistoryEntryContext;
      },
      services: {} as {
        fetchHistory: {
          data: HistoryResponse;
        };
        fetchHistoryEntry: {
          data: HistoryEntryResponse;
        };
      },
      events: {} as
        | { type: "details" }
        | { type: "closeHistoryFailure" }
        | { type: "closeHistoryEntry" }
        | { type: "closeHistoryEntryFailure" }
        | { type: "retryHistory" }
        | { type: "retryHistoryEntry" }
        | { type: "FETCH_HISTORY" }
        | { type: "FETCH_HISTORY_MORE" }
        | { type: "FETCH_HISTORY_ENTRY" }
        | { type: "SET_FILTER"; filter?: Omit<Filter, "chainId"> }
        | { type: "SET_ADDRESS"; address?: Address }
        | { type: "SET_TXHASH"; txHash?: TransactionId },
    },

    id: "history",
    type: "parallel",

    context: {
      address: undefined,
      txHash: undefined,
      history: INITIAL_HISTORY,
      historyEntry: undefined,
    },

    initial: "HISTORY",
    on: {
      SET_ADDRESS: {
        actions: "saveAddress",
        target: ".HISTORY.LOAD.loading",
        internal: false,
      },

      SET_TXHASH: {
        actions: "saveTxHash",
        target: ".DETAILS.loading",
        internal: false,
      },

      SET_FILTER: {
        actions: "saveFilter",
        target: ".HISTORY.LOAD.loading",
        internal: false,
      },
    },
    states: {
      HISTORY: {
        initial: "idle",

        states: {
          idle: {
            on: {
              FETCH_HISTORY: "LOAD.loading",
            },
          },

          LOAD: {
            states: {
              loading: {
                invoke: {
                  id: "entries",
                  src: "fetchHistory",
                  onDone: {
                    target: "#history.HISTORY.success",
                    actions: "setHistory",
                  },
                  onError: {
                    target: "#history.HISTORY.failure",
                    actions: "setHistoryError",
                  },
                },
              },

              loadMore: {
                invoke: {
                  src: "fetchHistory",
                  onDone: {
                    target: "#history.HISTORY.success",
                    actions: "setMoreHistory",
                  },
                  onError: {
                    target: "#history.HISTORY.failure",
                    actions: "setHistoryError",
                  },
                  meta: {
                    loadMore: true,
                  },
                },
              },

              hist: {
                type: "history",
              },
            },
          },

          success: {
            on: {
              FETCH_HISTORY: "LOAD.loading",
              FETCH_HISTORY_MORE: {
                target: "LOAD.loadMore",
                cond: "hasMoreHistory",
              },
            },
          },

          failure: {
            on: {
              closeHistoryFailure: "idle",
              retryHistory: "LOAD.hist",
            },
          },
        },
      },

      DETAILS: {
        initial: "idle",
        states: {
          idle: {
            on: {
              FETCH_HISTORY_ENTRY: "loading",
            },
          },
          loading: {
            invoke: {
              id: "entry",
              src: "fetchHistoryEntry",
              onDone: {
                target: "success",
                actions: "setHistoryEntry",
              },
              onError: {
                target: "failure",
                actions: "setHistoryEntryError",
              },
            },
          },
          success: {},
          failure: {
            on: {
              retryHistoryEntry: "loading",
              closeHistoryEntryFailure: "idle",
            },
          },
        },
        on: {
          closeHistoryEntry: ".idle",
        },
      },
    },

    predictableActionArguments: true,
  },
  {
    guards: {
      hasMoreHistory: (ctx) => !!ctx.history.cursor?.value
    },
    actions: {
      saveFilter: assign({
        history: (ctx, event) => ({
          ...INITIAL_HISTORY,
          filter: {
            chainId: ChainID.CHAIN_ID_UNSPECIFIED,
            status: FilterStatus.UNSPECIFIED,
            ...ctx.history.filter,
            ...event.filter,
          },
        }),
      }),
      saveAddress: assign({
        address: (ctx, event) => event.address ?? ctx.address,
      }),
      saveTxHash: assign({
        txHash: (ctx, event) => event.txHash ?? ctx.txHash,
      }),

      /**
       * History
       */
      setHistory: assign({
        history: (ctx, event) => ({
          ...ctx.history,
          entries: event.data.entries,
          cursor: event.data.cursor,
          error: null,
        }),
      }),
      setMoreHistory: assign({
        history: (ctx, event) => ({
          ...ctx.history,
          entries: [...ctx.history.entries, ...event.data.entries],
          cursor: {
            ...event.data.cursor,
            limit: HISTORY_LIMIT,
          },
          error: null,
        }),
      }),
      setHistoryError: assign({
        history: (ctx, event) => ({
          ...ctx.history,
          error: event.data as string,
        }),
      }),

      /**
       * HistoryEntry
       */
      setHistoryEntry: assign({
        historyEntry: (_, event) => ({
          entry: event.data.entry,
          error: null,
        }),
      }),
      setHistoryEntryError: assign({
        historyEntry: (ctx, event) => ({
          ...ctx.historyEntry,
          error: event.data as string,
        }),
      }),
    },
    services: {
      fetchHistory: async (ctx, _, meta) => {
        const wallet = ctx.address
          ? {
              walletAddress: ctx.address as string,
            }
          : undefined;
        return safeCall(
          getHistory({
            wallet,
            filter: ctx.history.filter,
            cursor: {
              ...(meta.meta?.loadMore ? ctx.history.cursor : undefined),
              limit: HISTORY_LIMIT,
            },
          })
        );
      },
      fetchHistoryEntry: async (ctx) => {
        return safeCall(
          getHistoryEntry({
            txHash: ctx.txHash,
            chainId: ChainID.CHAIN_ID_UNSPECIFIED,
          })
        );
      },
    },
  }
);
