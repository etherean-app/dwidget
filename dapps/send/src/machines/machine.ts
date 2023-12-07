import { Address, Chain } from "wagmi";
import { assign, createMachine } from "xstate";
import { TokenAsset } from "@dwidget/shared/proto/assets";

export type TokenContext = { address: Address; asset: TokenAsset };

export const machine = createMachine(
  {
    /** @xstate-layout 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 */
    tsTypes: {} as import("./machine.typegen").Typegen0,

    schema: {
      context: {} as {
        address?: Address;
        network?: Chain;
        token?: TokenContext;
        recepient?: Address;
        amount: string;
        error?: string;
      },
      events: {} as
        | { type: "send" }
        | { type: "recepient" }
        | { type: "network" }
        | { type: "token" }
        | { type: "transactionDetails" }
        | { type: "transactionPreview" }
        | { type: "failure"; error: string }
        | { type: "retry" }
        | { type: "close" }
        | { type: "transactionSubmitted" }
        | { type: "back" }
        | { type: "backNetwork"; value?: Chain }
        | { type: "backToken"; value?: TokenContext }
        | { type: "backRecepient"; value?: Address }
        | { type: "SET_ADDRESS"; value?: Address }
        | { type: "SET_NETWORK"; value?: Chain }
        | { type: "SET_AMOUNT"; value?: string },
    },

    id: "send",
    initial: "SEND_TOKEN",

    context: {
      address: undefined,
      network: undefined,
      token: undefined,
      recepient: undefined,
      amount: "",
      error: undefined,
    },

    states: {
      SEND_TOKEN: {
        initial: "SEND_TOKEN",
        states: {
          hist: {
            history: "shallow",
            type: "history",
          },

          SEND_TOKEN: {
            on: {
              recepient: "#send.RECEPIENT",
              network: "#send.NETWORK",
              token: "#send.TOKEN",
              send: {
                target: "SEND",
                cond: "isReadyForSend",
              },
            },
          },

          SEND: {
            on: {
              transactionDetails: "TRANSACTION_DETAILS",
              transactionPreview: {
                target: "TRANSACTION_PREVIEW",
                cond: "isReadyForSubmit",
              },

              SET_AMOUNT: {
                actions: ["setAmount"],
                target: "SEND",
              },
            },
          },

          TRANSACTION_DETAILS: {
            on: {
              back: "SEND",
              recepient: "#send.RECEPIENT",
              network: "#send.NETWORK",
              token: "#send.TOKEN",
            },
          },

          TRANSACTION_PREVIEW: {
            on: {
              back: "SEND",
              network: "#send.NETWORK",
              recepient: "#send.RECEPIENT",

              failure: {
                actions: ["setError"],
                target: "#send.FAILURE",
              },

              transactionSubmitted: {
                target: "#send.TRANSACTION_SUBMITTED",
                cond: "isReadyForSubmit",
              },
            },
          },
        },
      },

      TOKEN: {
        on: {
          backToken: {
            target: "SEND_TOKEN.hist",
            actions: "saveToken",
          },
        },
      },

      NETWORK: {
        on: {
          backNetwork: {
            target: "SEND_TOKEN.hist",
            actions: "saveNetwork",
          },
        },
      },

      RECEPIENT: {
        on: {
          backRecepient: {
            target: "SEND_TOKEN.hist",
            actions: "saveRecepient",
          },
        },
      },

      TRANSACTION_SUBMITTED: {
        on: {
          close: {
            target: "TRANSACTION_SUBMITTED",
            internal: true,
            actions: "appClose",
          },
        },
      },

      FAILURE: {
        on: {
          retry: "SEND_TOKEN.TRANSACTION_PREVIEW",
          close: {
            target: "FAILURE",
            internal: true,
            actions: "appClose",
          },
        },
      },
    },

    on: {
      SET_NETWORK: {
        actions: ["saveNetwork"],
        target: "#send",
      },

      SET_ADDRESS: {
        actions: ["saveAddress"],
        target: "#send",
      },
    },

    predictableActionArguments: true,
  },
  {
    guards: {
      isReadyForSend: (ctx) => {
        return !!ctx.token && !!ctx.network && !!ctx.recepient;
      },
      isReadyForSubmit: (ctx) => {
        return !!ctx.amount && !!ctx.token && !!ctx.network && !!ctx.recepient;
      },
    },
    actions: {
      saveAddress: assign({
        address: (ctx, event) => event.value ?? ctx.address,
      }),
      saveNetwork: assign({
        network: (ctx, event) => event.value ?? ctx.network,
      }),
      saveToken: assign({
        token: (ctx, event) => event.value ?? ctx.token,
      }),
      saveRecepient: assign({
        recepient: (ctx, event) => event.value ?? ctx.recepient,
      }),
      setAmount: assign({
        amount: (ctx, event) => event.value ?? ctx.amount,
      }),
      setError: assign({
        error: (ctx, event) => event.error ?? ctx.error,
      }),
      appClose: () => window.close(),
    },
  }
);
