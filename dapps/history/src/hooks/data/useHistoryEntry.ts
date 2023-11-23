import {
  HistoryEntryRequest,
  HistoryEntryResponse,
} from "@dwidget/shared/proto/history";
import { queryClient } from "@dwidget/shared/providers";
import { useGrpcQuery } from "@dwidget/shared/hooks";

import { historyClient } from "@/providers/providers";

function getQueryArgs(args: HistoryEntryRequest) {
  return {
    queryKey: ["getWalletHistoryEntry", JSON.stringify(args)],
    queryFn: async () => {
      const { response } = await historyClient.getWalletHistoryEntry(args);
      return response;
    },
    enabled: !!args.txHash,
  };
}

export function useHistoryEntry(args: HistoryEntryRequest) {
  return useGrpcQuery<HistoryEntryResponse>(getQueryArgs(args));
}

export function getHistoryEntry(args: HistoryEntryRequest) {
  return queryClient.ensureQueryData<HistoryEntryResponse>(getQueryArgs(args));
}

// export const useHistoryEntry = (args: HistoryEntryRequest) => {
//   const { historyClient } = useGrpcContext<IGrpcContext>();
//   return useGrpcQuery<HistoryEntryResponse>({
//     queryKey: ["getWalletHistoryEntry", JSON.stringify(args)],
//     queryFn: async () => {
//       const { response } = await historyClient.getWalletHistoryEntry(args);
//       return response;
//     },
//     enabled: !!args.txHash,
//   });
// };

export default useHistoryEntry;
