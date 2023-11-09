import { TokenAsset } from "@dwidget/shared/proto/assets";
import { assign, createMachine } from "xstate";

export type TokenContext = { address: `0x${string}`; asset: TokenAsset };

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SzAOwgOgMoFEByAIgPoAqA8gNL7b7HlV4DEK6A2gAwC6ioADgPawAlgBch-VDxAAPRAFoAjAFZ2GJQGYA7AE52AJnUAOAGwLdmgDQgAnvPXq9GTYfUAWTevbaX2ha4C+-lYsmLiEpJTUYXSRTABOYADGYLxCaCIc3EggAsJiElKyCHKuSkoY9oZ6xtramuyexpY2iHquqoau2nrshl6aZkqGhoHBaKG0EQw04fT4jKhgIgDu-HEA1plSuaLiktlFJSoYxq562m7KOq7GVrYInoYYCsaGCsNu2qYKbqMgITMYtNolN5iJ+Os0Ftsjt8vtQIdXK4FBg9IZNK4+kjhm9tHdEH5ysjjKZzjVSgNjH8ASC5nhAYwRHEAIaoWDMxJwghLZlCAA2sGhfEEuwKBzsjh+L2G3RuRnUCnxxT0mmMqJcmIUUvsCvU1PGgNB9OijJZbI5cIACgkAG5pZZCnIiuGFRDqJSaJzGDR1Xx9Jp4lrK1XqtxvbX2H769CGukYEgAJQAgngsEmAMIkACSZDwRAIOBISazABksIwAEYczZcbbOvau4oKBpqdhNEwUrV6IZKuQqtVosNa3WRvVBf4G2mxePJ1MZ7O5-OF4tlxgJZKpdKO2EN8XFIwVHTeS7GdgKerNe5tDpdHp9OqDbQBcc0yZxxMptOZnN5gtF0vlosKxrDWWTCnku4IogrgYMiviPm0SjGHoZhKo8zyvO8GpfMOz5jDGU7TB+c7fouf4ruW4KQqg271mKUHFE0TgGN6DRGGY6J6Eq55PG8Z4-PUPwelSL4GnghYAOpkAmFCVtWeBLKsGy0RB9EyHYnQYFU3TnOeSjaB6Bm9uUKE3O8NQKgMCoifhmAJjg6Y4JaWb4CQcmJKBdaqfC6n7mYGDsM4Sgquw7RIR2SrogF7AqO0+hfBorzRpgxFfgueaWvZABqLkSaarLspyexYAArhWAC2ogiJAKmij5RTouoGC+BimgGF4Zg1L2aIor0uIYk0rV+MlM6fvOP5EJlOA5TgeVVh5tUunuNSONe7ruDcXRPr27pquoT7ON2bibacI2peNi5YAAqgAQgAslmJAkDgBDuZ5MJ0fVBLnmqNSvK8x3NiSO3eBUZyUgqZT6AoZ2xG9JAQlCtYfd5jZ9mih77YJuinttQZyCZhJvAYZJtJoSiBOOqD8BAcBSCEXl1WjKhNZU1S1PUjSXvISjns8PwxeiuiuPtI2EfgjNLQxchaE1zadKeVSlG0Bi9mc2gnALukuB67pjrZsbTuLeCS5Bvky22FRvCSyH6MhhiBvcMsOE4Otnt4JJtCYYtvtOAAWQiwCIptqYcDjlPLNy9IhKvqL2ZiegN7j7V0WiGGUPuzEbtAh19CDKFp7R1FUDhaO0XH424koC1oDQ1NKNkTgRvtEbOaUTeRAG58zctmHUKpIs43q3PjKEDhq4YjgqI3iSQUkyd3e7oxH7AxfY3Yby8rhob0GFvB8XTfL8okxvZjnOa5i-S3oGMaND3q8+6uiGEq16F90vT9I+eFNylbcXRlbKuUr6+WMAqZ43g2rtV8F8R28g0SOEqAnG4mgho-wBOdUieZrr3Ues9AgICihan0M8JEDRMQdS+NzZUVQKjsTqCgtBsMGCEPgQoRwbUyjdnPChdh5NuLOC0s2ZsXRcRon0JTfwQA */
    tsTypes: {} as import("./machine.typegen").Typegen0,
    schema: {
      context: {} as {
        // address?: string;
        network: string;
        token?: TokenContext;
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
        | { type: "backNetwork"; value?: string }
        | { type: "backToken"; value?: TokenContext },
    },
    id: "send",
    initial: "SEND_TOKEN",
    context: {
      // address: undefined,
      network: "mainnet",
      token: undefined,
    },
    states: {
      SEND_TOKEN: {
        states: {
          SEND_TOKEN: {
            on: {
              send: "SEND",
              recepient: "#send.RECEPIENT",
              network: "#send.NETWORK",
              token: "#send.TOKEN",
            },
          },

          hist: {
            history: "shallow",
            type: "history",
          },

          SEND: {
            on: {
              transactionDetails: "TRANSACTION_DETAILS",
              transactionPreview: "#send.TRANSACTION_PREVIEW",
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

        initial: "SEND_TOKEN",
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
          back: "SEND_TOKEN.hist",
        },
      },

      TRANSACTION_PREVIEW: {
        on: {
          transactionSubmitted: "TRANSACTION_SUBMITTED",
          back: "SEND_TOKEN.SEND",
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
  },
  {
    actions: {
      saveNetwork: assign({
        network: (ctx, event) => event.value ?? ctx.network,
      }),
      saveToken: assign({
        token: (ctx, event) => event.value ?? ctx.token,
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
