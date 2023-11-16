import {
  UniswapRewardsRequest,
  UniswapRewardsWidgetReply,
} from "@dwidget/shared/proto/etherean";
import { IGrpcContext } from "@/providers";
import { useGrpcContext } from "@dwidget/shared/contexts";
import { useGrpcQuery } from "@dwidget/shared/hooks";

export const useRewards = (args: UniswapRewardsRequest) => {
  const { ethereanClient } = useGrpcContext<IGrpcContext>();
  return useGrpcQuery<UniswapRewardsWidgetReply>({
    queryKey: ["getUniswapRewardsWidget", JSON.stringify(args)],
    queryFn: async () => {
      const { response } = await ethereanClient.getUniswapRewardsWidget(args);
      return response;
    },
  });
};

export default useRewards;
