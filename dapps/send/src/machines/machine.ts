import { Address, Chain } from "wagmi";
import { assign, createMachine } from "xstate";
import { TokenAsset } from "@dwidget/shared/proto/assets";

export type TokenContext = { address: Address; asset: TokenAsset };

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SzAOwgYgMoFEAqA+gHL4DqA8gEoDSA2gAwC6ioADgPawCWALl+6hYgAHogC0AdgCsANgB0MgIwBOAExLFAZkWKAHIoAsAGhABPcTvpydBqavozVimfUOKAvu5Mp02fAQBBABEgyhwsLAZmJBAObj4BIVEESSlNOWVlA1UJRXpNXIkJGRNzFPVVOXpdemUJGql6KVkDA09vNAg5XCIggjxyahwibuG+gaGiDAAnMABjMFYuNB4ooTjefkEY5LFbKTknTW0pFWbVVuMzRAurXQM1atrc5SldXXaQHy6e8cHh0a9fr-KaoMA8ADu7GmAGs1jENgltqBdrYrKcJHVlJpdNoZAVSohNNVrDJ9O9NA8NJTPt9AX9JvTgZMMDx2DC0PC2JxNokduJWopSapTvjNE5dJjCQhnEKdGSDPj6A5dKdaZ0mRMAb9mcMMN8ubEeUikuJiZV8mlNFjXLKpNKxMdKvVKRJicpccpDOr0JqQfTWdMAIaoWBBuZIoLgoNcAA2sENiK2ppS4qqDjdBkMHtk+QdOXkqlxBn0Wi0xy0Pp+Y11I1+gZDYYjWwACrMAG7LCGJ43J-kyiQGORSV66ItvFz0TFXMqO4rWLMGbSS5T4mRSKt+xn13CEAIAWXIAFUiHge-E+yiLEXrNUR+b6qvNPbrilFcpDvoDPUaquS+pNx1LURjwSgAiILAAgAYTwABJcgiAIIJ8ACWCABksAwAAjcM4SYdZez5K8UjydIcT0PEx2OPNXzEAtP0pUttGOZjAJrYC5FA8DIJg+DEOQvBUIwmZ5kWZZUFWfCEUI5ERAFD9GKKHIVHLEVpVUYlP0UJw8icEVlTaLwvg1ID-S4iDoLghCkJQ9DMLBSFoTw6JuQvIi5IQIdlCaPRlTqa0vXFaUDFcBRalqdQHhqGQJDYoEOPMnirP42zhLZDlUHPXlZN2GLhw9GRXlkSlnFaaVFHqOR9FtApXGfYo4oZAFEssviCBbMIADVYJwUhsNwrKTX7a0rEVRiM2kDSJAdJcrGKRVFGaMc9GURra04sCLN46yOpwbreowByoVhQbLw8lwDlqXFdA9ZbFWC0KXG8tQZCijM1oSzakra3b9r62YFiWFZTvc5I7AOQqRzsL0dAkegZxuWoqhLEd4ZC-zXo+syvtanaup6vqADMY1jABXWYQZyxBvIOWx0ZUex3nqB0nTkQcThi+5lMMjpfVMxkWu2xDfoJhtQ3DJEsFJrCAFteB4SBKZTBo5EVcKSyXXISxZtQ2dhlxB2cGQYo3Iy6WA-q5hhPB2U5KTXOylMxBUIdNHXCltNObTVGlEdh2NpRVxe57n03Eg8AoGhLZhIhwWO5yCLcqnU1xDJ8lyd47EuX2P1kY2VEK9RnpkTcwignAWx609o8oUSgYkpX+0dPQqmfU57CzapnE0FmhWKYkKuaXJCsMEuzY1QXkoILAjwAIX3WC8DwHAgmjxviJ0V4qnUWQpDdPSlxmpQqhqEKroq2xpE3AAxISjzCESeGmUx1487SKpP7SSwHvePXzRVVZ6HZkUfO+IebGV9LfdC98cAYDmLGTgYBX7JEMCWVWRZFrWm0jdWwM1sSqykK0CsbtVBqE8EZVA7AIBwCEN8ROjsm7NDIlkYo2J1DElxA6V6Q4MFLQxAHMevNqzxRBPQoaxExCNAONab8hVxRKmLA6Zo8h6iYKzN5Uh7wsaMgABZcFgDwMRZ1djii8riRoLgHiG1eA6FQEg2aKm-DI7E9RmjaO1OxUR0kk5O0vnIGRrD5EcMpCzNMLonFXSweAuk-MPG9CMaDRAzh-E5AcHkRajQbq6BZvONwS4gFPleoIiBwimogRxkLGygk7IJOTpIyomRGgVTqMqeGRZ8zJKLIxHQzEKzuPKdxXGwt8a9VqSmOw9iorNFeEudGPtaIFHkHk5cmI1yKk3MBMZTcchDklEoJQxIYoHJ7q+Zw6JcSqAuJiaGRww5kCoNQLZEidlVWKLKQ5bzjgPSFE9CKr0PTvXHr6MuFcq54CeR5Oig5Xn7K0BmY56lKq4mkAUVoY5VpAq6JPNqM956L2XkECFKCKJVWaNkEBOQLk62dPrKcWYA4fExXIKBaEYFEqSRpXQ1gvSrkKneTRLN7Bs0lCWO6RcmjkPcEAA */
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
          back: "SEND_TOKEN.SEND",
        },
      },

      FAILURE: {
        on: {
          retry: "SEND_TOKEN.TRANSACTION_PREVIEW",
          close: "SEND_TOKEN.SEND"
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
    },
  }
);
