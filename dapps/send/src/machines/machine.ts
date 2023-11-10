import { Address, Chain } from "wagmi";
import { assign, createMachine } from "xstate";
import { TokenAsset } from "@dwidget/shared/proto/assets";

export type TokenContext = { address: Address; asset: TokenAsset };

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SzAOwgYgMoFEAqA+gHL4DqA8gEoDSA2gAwC6ioADgPawCWALl+6hYgAHogC0ANgDsAZgB0siQCYJAThn0AjPS0AOADQgAnuM3a5ZgCwBWJfWWaJWy5oC+rwynRzcRACIEeOTUOEQ+oQFBIUQYXhAMzEggHNx8AkKiCGKa1vRyLkqqllISVvS6loYmWTIySgq6MsUaqo2qmpbunmgQ4f6BwaF9kYMxAE5gAMZgrFxoPAlCKbz8gkmZYjbWckqatTmaqta2lqdViEqWeRWqdrr0qlKH1rq6XSBxwwPRX1GhGKgwDwAO7sMYAa0WSWWaTWoA2Njy1k0Uke6kajhkUnOCA0ugsEl0mleTVUpT2nQ8Hx6v1GtOiGB47HBaChbE4K3S63Ep00BKUtms0iuqjJlWMiA62xcElKhTUNieEnen18Ix+asZYwAhqhYNrJrC-EDtVwADawNnJDmwjLiOpyHTSJodVpC+gyHFiJQlHaNSxEvZ7fYyFU0tXfIaang6vUG2EABQmADc5sCrTDVnbcdYpHJdKoPbY1EpdLklF6fRI-U1AzJg-XQ1TVRFI2FNbhCABBACy5AAqkQ8BmbVnuTU8wXjrpLkKzDJZdYvZY1H6OlJXg8JAGVGHvBG-mE8JQu0QsF2AMJ4ACS5CIBD8+C714AMlgMAAjA2QphLUdc+FTA9OQZCJDFCSUWoPUrX1S1recGz2PdegPOlj1Pc8r1ve9HzwZ83wwCZplmeYR1SMdAJqfEBXLXRt00SDilUHFLmuSxbnKB4niOIpkPpIZ0LPS8bzvB8n1fd9ARBMEf0SdlyIAkREEsORrFOegpEsBcpEgsstBxPECTA-0yXnSlun3VtDzkQTMJEnDxIIpkWVQMjOThJSsmkVTWjUY4JBdbdxWqFF8SJLQ9ikLQZFzZVmxpEg8AoGhP2-IggVBCE3NtccxFA+RCyxYky0uM4JQQaxVFU2VSjJW41C3PjKBwC8cATa9QjwVLJnBSgphmOZUAWX9oX-DyNnrfFalzDSormjTKxUybHFyK5t3oFw+Ns4TsIIBNmoANQ60gtV1fVDVWLAAFcPwAW14HhIGyijPN0TTHUsS4fXKGQ0QrcrvSJR1XkOTTpE0p5zOpbxtqw0T9pwI6cBOr8euexTMhLECJGsFpbAYolsQBmLq1+4oZ1x05t23LaTyEuH7ywfsACEe2vPA8BwPxutkv8FPGyUUWrGdiUgsxXgLL1fqmz6lXrY56F2LbRh5vBmVZEb5Pc7NsiOR11BUWsnGOBivUeCwtMLCLdlLMl3CpVB2AgOAhDiPntdy3J5F2fZkSOE4yuqSRTjXF4NsJWRaj41DondnLKLynS5FaGL7A2x4XCOL1-IaHJhQzz63niyz+msmPQjjl6JvsHYhSeDofQqWUpYdDdU8OOjlADOKLJQqy6QACy4WAeErjH7UuZPGlyJx2M054vVBhQV2aIp1A3Y5o-7jUIjHgWEByZOcfUDQNLzjR-qDpp6nnD0ooXdpCR76G+9LtC6bs3bcPwrA9512xk5HC0KiKKOhC6VkcDWAMCFaj1j4olZK1A-65SUJPR4xwNzFCkLIdQEgDLlCMsVUk5ImhNRam1DqQ5kEJ1QfiK4xYUQlFigYcqrF8zsTuFxZ4vFi69FhvZPah1jrUM8gFPkdRtJRTaKiS+4hSz1FqESDO4NigdFphhHaokmas3ZpzPwIjMhmEVjsQkrQjjSOYgDeRIFQKgxXNg1RUNPiHgMXIhicgnD0Bmr9SOG0iYhQ3PmbQ2h2JKNLIre2rggA */
    tsTypes: {} as import("./machine.typegen").Typegen0,

    schema: {
      context: {} as {
        network?: Chain;
        token?: TokenContext;
        recepient?: Address;
        amount?: number;
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
        | { type: "SET_NETWORK"; value?: Chain }
        | { type: "SET_AMOUNT"; value?: number },
    },

    id: "send",
    initial: "SEND_TOKEN",

    context: {
      network: undefined,
      token: undefined,
      recepient: undefined,
      amount: undefined,
    },

    states: {
      SEND_TOKEN: {
        initial: "SEND_TOKEN",
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

    on: {
      SET_NETWORK: {
        actions: ["saveNetwork"],
        target: "#send",
      },
    },

    predictableActionArguments: true,
  },
  {
    actions: {
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
