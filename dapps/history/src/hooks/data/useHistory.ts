import { HistoryRequest, HistoryResponse } from "@dwidget/shared/proto/history";
import { useGrpcQuery } from "@dwidget/shared/hooks";
import { queryClient } from "@dwidget/shared/providers";

import { historyClient } from "@/providers";

function getQueryArgs(args: HistoryRequest) {
  return {
    staleTime: 5000,
    queryKey: ["getWalletHistory", JSON.stringify(args)],
    queryFn: async () => {
      const { response } = await historyClient.getWalletHistory(args);
      return response;
    },
    enabled: !!args.wallet,
  };
}

export function useHistory(args: HistoryRequest) {
  return useGrpcQuery<HistoryResponse>(getQueryArgs(args));
}

export function getHistory(args: HistoryRequest) {
  return queryClient.fetchQuery<HistoryResponse>(getQueryArgs(args));
}

export default useHistory;
