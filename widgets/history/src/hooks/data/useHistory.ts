import { HistoryRequest, HistoryResponse } from "@dwidget/shared/proto/history";
import { useGrpcQuery } from "@dwidget/shared/hooks";

import { historyClient } from "@/providers";

function getQueryArgs(args: HistoryRequest) {
  return {
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

export default useHistory;
