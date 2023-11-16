import { Address, Chain } from "wagmi";
import { assign, createMachine } from "xstate";
import { TokenAsset } from "@dwidget/shared/proto/assets";

export type TokenContext = { address: Address; asset: TokenAsset };

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SzAOwgYgMoFEAqA+gHL4DqA8gEoDSA2gAwC6ioADgPawCWALl+6hYgAHogC0AdgCsANgB0MgIwBOAExLFAZkWKAHIoAsAGhABPcTvpydBqavozVimfUOKAvu5Mp02fAQBBABEgyhwsLAZmJBAObj4BIVEESSlNOWVlA1UJRXpNXIkJGRNzFPVVOXpdemUJGql6KVkDA09vNAg5XCIggjxyahwibuG+gaGiDAAnMABjMFYuNB4ooTjefkEY5LFbKTknTW0pFWbVVuMzRAurXQM1atrc5SldXXaQHy6e8cHh0a9fr-KaoMA8ADu7GmAGs1jENgltqBdrYrKcJHVlJpdNoZAVSohNNVrDJ9O9NA8NJTPt9AX9JvTgZMMDx2DC0PC2JxNokduJWopSapTvjNE5dJjCQhnEKdGSDPj6A5dKdaZ0mRMAb9mcMMN8ubEeUikuJiZV8mlNFjXLKpNKxMdKvVKRJicpccpDOr0JqQfTWdMAIaoWBBuZIoLgoNcAA2sENiK2ppS4qqDjdBkMHtk+QdOXkqlxBn0Wi0xy0Pp+Y11I1+gZDYYjWwACrMAG7LCGJ43J-kyiQGORSV66ItvFz0TFXMqO4rWLMGbSS5T4mRSKt+xn13CEAIAWXIAFUiHge-E+yiLEXrNUR+b6qvNPbrilFcpDvoDPUaquS+pNx1LURjwSgAiILAAgAYTwABJcgiAIIJ8ACWCABksAwAAjcM4SYdZez5K8UjydIcT0PEx2OPNXzEAtP0pUttGOZjAJrYC5FA8DIJg+DEOQvBUIwmZ5kWZZUFWfCEUI5ERAFD9GKKHIVHLEVpVUYlP0UJw8icEVlTaLwvg1ID-S4iDoLghCkJQ9DMLBSFoTw6JuQvIi5IQIdlCaPRlTqa0vXFaUDFcBRalqdQHhqGQJDYoEOPMnirP42zhLZDlUHPXlZN2GLhw9GRXlkSlnFaaVFHqOR9FtApXGfYo4oZAFEssviCBbMIADVYJwUhsNwrKTX7a0rEVRiM2kDSJAdJcrGKRVFGaMc9GURra04sCLN46yOpwbreobUNwyRLAAFcsIAW14HhIEGy8PO8yoYsxPRZGU+oHWtIdlS0Ip12xcc1oSzakra3b9r6hyoVhO73OSFwDlqXFdA9ZbFWC0KXG8tQZCijMgbMkHWp2rqer62YFiWFZYZyxA7AOQqRzsL0dAkegZxuWoqhLEd2ZC-zcc3YD+rmGE8HZTkpNc7KUzEFQh00dcKW005tNUaUR2HGRtZUQr1Gx59NxIPAKBoEWYSIcFoecgi3Np1NcQyfJcneOxLg1j9ZB11ccexmRNzCKCcBbHrT3NyhRKpiSadl5cqmfU57CzapnE0T6hWKYkKuaXJCsMf2jLpFrtsQrAjwAIX3WC8DwHAgnNmP+y0V4FB0NIpz0kd1doxUrEcGLznqdvYs+VB2AgOAhG+W2Zf7MRmjIrJigBpVcQdXGhyLbNiSaarNAJyYZ6G4j56aOQvuX8VV8pB1mnkepDFyPI9FyDdC5M9j-QACy4WAeCP+6uxxReVxI0FwDxBxnAdCoCQchBy4zdFkbEQ834dF9KZbcn9D7STtrLWwsCL6FSvsSYsn00wum-O6T03p37oKwdqMYAC4aIGcOfHIDhn7NGqB6T6843BLhfk+XGBc0HVnioTbixMUqCTskw+289KiZEaBVOoyp2ZFnzKwosjEdDMQrAfZqRMS7tVJr1ORKY7CwKis0V4S5+bd1nAUeQ-DlyYjXIqIWIJzFzxyEOSUSglDEhioEtOr5nDolxKoC4mJmZHCNmQKg1BvEn18VVYosognpOOBjIUWMIq4w9PjWhXRA7B1DngZJHk6KDjSQErQGYQnqUqriaQBRWhjlWsUjakjjFl0rtXWuQRKnJDLM6CKjRVRFVUMoT6WR0y-WKPeIsthPCeCAA */
    tsTypes: {} as import("./machine.typegen").Typegen0,

    schema: {
      context: {} as {
        address?: Address;
        network?: Chain;
        token?: TokenContext;
        recepient?: Address;
        amount: string;
      },
      events: {} as
        | { type: "send" }
        | { type: "recepient" }
        | { type: "network" }
        | { type: "token" }
        | { type: "transactionDetails" }
        | { type: "transactionPreview" }
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

              transactionSubmitted: {
                target: "#send.TRANSACTION_SUBMITTED",
                cond: "isReadyForSubmit",
              },

              network: "#send.NETWORK",
              recepient: "#send.RECEPIENT",
            },
          },
        },
      },

      TOKEN: {
        on: {
          backToken: {
            actions: ["saveToken"],
            target: "SEND_TOKEN.hist",
          },
        },
      },

      NETWORK: {
        on: {
          backNetwork: {
            actions: ["saveNetwork"],
            target: "SEND_TOKEN.hist",
          },
        },
      },

      RECEPIENT: {
        on: {
          backRecepient: {
            actions: ["saveRecepient"],
            target: "SEND_TOKEN.hist",
          },
        },
      },

      TRANSACTION_SUBMITTED: {
        on: {
          back: "SEND_TOKEN.SEND",
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
    },
    // services: {
    //   async getAssets(ctx) {
    //     const response = await getAssets({
    //       wallet: ctx.address ? { walletAddress: ctx.address } : undefined,
    //     });
    //     return response;
    //   },
    // },
  }
);
