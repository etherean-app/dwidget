import { Address } from "wagmi";
import { createMachine, assign } from "xstate";
import type { TransactionId } from "@dwidget/shared/proto/transaction";
import { ChainID } from "@dwidget/shared/proto/chain_id";
import {
  Cursor,
  HistoryResponse,
  HistoryEntry,
  HistoryEntryResponse,
  FilterStatus,
} from "@dwidget/shared/proto/history";

import { getHistory, getHistoryEntry } from "@/hooks";
import { HISTORY_LIMIT } from "@/constants";
import { safeCall } from "./utils";

type HistoryContext = {
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
    /** @xstate-layout N4IgpgJg5mDOIC5QAsCWsAuB7ATgTwGIBlAUQBUB9AQQBEaAlEoogbQAYBdRUABy1lQZUWAHbcQAD0QBaAOwBmAGwA6AJwBGRbIBMAFkUAONgfUaANCDwz5stfNMGArOt1sb69Y90BfbxbSYuISklGQAGgASVEQR7FxIIHwCQqLiUgiyqvLKugYG8kaKWrqyuvIWVghyqsryjvXyqrr6snmysr7+6Nj4yhEAkkRkAPL0AJrKqBAANmAEAGLkAMIRFANDo2Nx4kmCwmIJ6dKOsurK+WwaBrKGxrkVMoqOOY7a8nqnqiaq2qqdIAEeng+oMRuNlAAZYa0ZTTLAAQwgqBEUAIEFEYEmIgAblgANaYsAiDA4VBwbYJXYpA6gI5KFTqAy5UpsbTtQoPBDaRwGc4uNivdTabRM1QdPwA7pBEEbcFQmFwxHI1FgHA4XDKHjTeEYABmuAAtsoiSSybAKbx+HtUocZMLbJ4vDpVIp7JlHIpOdzeSZXILhaKDP9AdL1mCJvKaLCERAALK4ObokSY5G4gnKEO9MObSHQqOKuMJhCprAAYx1+ziFsSVupaRk6lsRlewsU2jYuh59S9PL5unUbAHbldWWDUqzoJzkejiPjODmqvVOE12r1hoz4+B2bleZnhfnxZxZYroirnB2tf29YQnm0OUu-ddzKy+h7PpcA6HSka2jHgQnsoTLAACupalnAsALMsqzbls56UpeNq0jIJS6MoijGM27xKLoqgCpy+jPJ2Bhtj82haJc5F-kCMrhsoIFgRBUFkCsayTuMFCxqMJDVlSV62ggBTZC02ieKoYqKE0Wicj8yg6KJbjyGwsjGCcv4SpmW7sRMurwqg0zAfOBClnCsBgBEm7zHpBnzrxiE0pIMg8mwOQaB2WifEp6icicvIiuRuG+myjjyNRobacoun6YZczziSeAWf+eB2ck-HIVUYpqGwHZ6E8bCusK5SWIgIXZG4+UlF8Q5imFvQ0OQVD9BCRDGaZ5mbiQxL4Cl1oOek6jyIN5zvKyHqnANSictILi2Kc8ido4TQdiFQq1cC9VkI1zWTDMcyLCxMHaRQJAAHJkOMPV1gJHjtjkjKGDodxOJ6xVVEycnthh1wFJJHqhRpm7KBtW1EHuypohiWJpoSXXJfBlqpUhjk3r8NSMnUGgek8z2cgOaGNnolWOB2CiKOoa1Aw1TWgwW4OLhqWo6vqOBGia3XwzWiN9YgHgDcorzKajQplI4uMdsoBPNO6JNKOTANJZTm3U5F1kxQQcX4IlQKdfFl1pcjeRofYqiLbhNhtoyPbPORPyKLoIqUcp4pdArwPK1FNlzCZ-DtUlOv4FZ0W2RzfFI+kYr46JeivKK+GvfdcnZW5rKuAYbK+BKIhYBAcDiJpF5c9ecjvRoWi5UY3zea90jvCoptFIKGgis0FOwQXvVF22vK4XjHmmF5U1vDUD6uu8-b1AorcRVMszt1d6XHG8yjZUUBgR6crqyFNnhnPXg7kY0JFyy7NGwbmtBz-rdL1BLi0ugKmR4Vv1educXyDVk7b5RhdtT4B5-5hjMqS+YdrDKVvuJDCJxxLKQImcDCmghJaAwtlf6J9wr-2nAWOcYAQHcwQLhc4pQVKZFaCRYmqg4HoUHA9PQ+Q148j-nRacgI8FFzwhLE2op7pl08LjQhuVOw-BIvYCeTCcwMXArAeACFC7XWePSYo3I2wKTcJyRoKgJL1CTiKTQshHDiPBB7GKbCBLSCMBLQwZsMbcn0doTkGFbDCJsAoV4G9FAUzds1Ux6V8gqGNqbLINxRIGEHnUZQok6jGAKkE1kniqbbRnrg2RHdroDTvLkPCbhmj23IqLauM05IDRKA3EK2NnaSldgkmmQCUQ+ORjdH09QeQBj9Dobe2QPS-FaO0OobxHHxKVttSREF6n9XeNbVsJg3BCneM-So3JraSQCg7H4TtBkgxVkHZJCNUnpQ8Bhc41wsivCaEVBZN8bYrKMGs8UvggA */
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
        | { type: "SET_ADDRESS"; address?: Address }
        | { type: "SET_TXHASH"; txHash?: TransactionId },
    },

    id: "history",
    type: "parallel",

    context: {
      address: undefined,
      txHash: undefined,
      history: {
        entries: [],
        cursor: undefined,
        error: undefined,
      },
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
      hasMoreHistory: (ctx) => !!ctx.history.cursor?.value,
    },
    actions: {
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
        history: (_, event) => ({
          entries: event.data.entries,
          cursor: event.data.cursor,
          error: null,
        }),
      }),
      setMoreHistory: assign({
        history: (ctx, event) => ({
          entries: [...ctx.history.entries, ...event.data.entries],
          cursor: event.data.cursor,
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
            filter: {
              chainId: ChainID.CHAIN_ID_UNSPECIFIED,
              status: FilterStatus.UNSPECIFIED,
            },
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
