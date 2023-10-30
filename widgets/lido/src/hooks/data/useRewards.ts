import { LidoRewardsRequest, LidoRewardsWidgetReply } from "@/proto/etherean";
import { IGrpcContext } from "@/providers";
import { useGrpcContext } from "@dwidget/shared/contexts";
import { useGrpcQuery } from "@dwidget/shared/hooks";

export const useRewards = (args: LidoRewardsRequest) => {
  const { ethereanClient } = useGrpcContext<IGrpcContext>();
  return useGrpcQuery<LidoRewardsWidgetReply>({
    queryKey: ["getLidoRewards", JSON.stringify(args)],
    queryFn: async () => {
      const { response } = await ethereanClient.getLidoRewardsWidget(args);
      return response;
    },
  });
};

export default useRewards;
