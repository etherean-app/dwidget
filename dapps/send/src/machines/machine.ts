import { Address, Chain } from "wagmi";
import { assign, createMachine } from "xstate";
import { TokenAsset } from "@dwidget/shared/proto/assets";

export type TokenContext = { address: Address; asset: TokenAsset };

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SzAOwgYgMoFEAqA+gHL4DqA8gEoDSA2gAwC6ioADgPawCWALl+6hYgAHogC0AdgCsANgB0MgIwBOAExLFAZkWKAHIoAsAGhABPcTvpydBqavozVimfUOKAvu5Mp0c3EQARAjxyahwiP3CgkLCiDAAnMABjMFYuNB4GZiQQDm4+ASFRBDFbKTknTW0pFSk7AwaTcwRVAytdAzV6XXplCVrdXU9vNAhIwODQ8PHoqbjUMB4Ad3Z4gGssoTzefkEc4tKpKxqJPuVNXW0ZTQkmxE1u6xl9Qc1OjTfhkB8x-1nYmaTWIYHjsNZoTY5bYFPagA4NRRPVR2WQSNrKZQyYxmRCGcoGZxKVSY5S2foyL4-QExaZ-IHhDA-SFsTg7Qr7cQPVRyeiaKRVM6uZyKKR3EpVbkSS4GCQPZSXZSGSmjalzGYg+IAQ1QsE1SRhAUWmq4ABtYMzcqyYUVOdz6A5ZQTOrpZLyxWJVBJ5KppfotFoqlplb46TSIn8NdrdfrdgAFRIAN3SSwt0N2NpaigkCgMHWJUgxugknvdb25OgedVaMix9Fkwd+UXp4ai2HwBAAggBZcgAVSIeFTVvTHJKih91m6Ba5UsxfPdBhkygq+hlg16WN06gbqoBeEoHaIWA7AGE8ABJchEAgBfAd88AGSwGAARnqNkwtsP2XCLLy5BcehXFuVRujiJSet6voVgG2iaDuoZqvuh7Hmel7XreeD3k+CTJKk6SoJkn5Qt+sIiJyugVHU9A+li45vKcYqtO0nT2D0fS1KSCFNmGcjIUep4XleN53o+z4LMsqwftkLL5COv4IAYchSA09BopoMjFhcRyKGKDyUc4LzSpiFYGNxEy8fxqFCRhok4aC4KoEOck-uRJSacp8pLnU1wEli2LNFmlH6EKNyuHyXo7iQeAUDQr7vkQiwrOszlsmRBwXJocjKLy-SDPUjTgQWyk1koJLqDlmI7pQOAnjgsbnuEeDxUkayUHhaQZKl1qjmI2iUVUUgSGpw2jWp7qtABejOEcbS1gSO5WYJ6EELGNUAGqNaQLXSV+LnpYgBZWPQBKqFyRw3D6C4itlfI0ac+jaFK8FeN8KpLWhwlrTgm04NtPBajqeowlgACuL4ALa8DwkDdfJbk9OWbT8ionqYrIpYGOWWh1vUNbIxSr1Uh9NkEFgvYAEJdueeB4DgAQ7XDrnFDoNbWHdqieroWJvKK4GlDd5xHGjj1BS9Iy+GGO14GCELEbJaUZmItQ8uc6hvNzuPju6fTWAYmg5UKTg+lVROjG2hAdgEAQ1VgWBMwdJTSFlGJY-0uVZl6E2ODy7FSnWuP+Z4r2oOwEBwEIPx7YrvV1FlBsykumjq90mjuv5K6GNcLrOLmQxmyGPFzNHPUKWIRzlAnXpq9cqcBeIPlyFKeLjrlyLi29hcWWqAAWXCwDwJfwxlk3yndLidGitTuio2ZolisqkucUp1OZ-y0kXsRD8z4hkgBpLV8ntfSqWydN9Ksq9AqSoF423cAn82+O4LMjTg8akirXqiY9jDxhRpipniEwlnfdeEQSYrUwthLAT8lZ2GysoHSpxhr2ixroCazgVwaxglUbQUUyBUGoLA3qnMlJ9DqFKGUEhF4aT0o8QyehjIfDMrfOQNU6oNSasQsunNKLI3UJ7V+Xp0HgWYnIDoXQ-acRYSAviB4BKfWvN9X6pBuFuTqJRL0nQVAnVfsnH+1gcb-yXIZYBncxgQOEuTKmNM6YBDUSzEU5Riz61fnOPktD+ZlkMZWPGtZ6ysLDA48QxsFD2iGryPooEZRiiCuIxQrgTrylRojYO7ggA */
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
                target: "#send.TRANSACTION_PREVIEW",
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

      TRANSACTION_PREVIEW: {
        on: {
          back: "SEND_TOKEN.SEND",
          transactionSubmitted: {
            target: "TRANSACTION_SUBMITTED",
            cond: "isReadyForSubmit",
          },
        },
      },

      TRANSACTION_SUBMITTED: {
        on: {
          back: "SEND_TOKEN.SEND",
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
