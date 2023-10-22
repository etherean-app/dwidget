import { LidoRewardsRequest } from "@/proto/etherean";
import { IGrpcContext } from "@/providers";
import { useGrpcContext } from "@dwidget/shared/contexts";
import { useGrpcQuery } from "@dwidget/shared/hooks";

export const useRewards = (args: LidoRewardsRequest) => {
  const { ethereanClient } = useGrpcContext<IGrpcContext>();
  const {
    data: rewards,
    isLoading,
    error,
    refetch,
  } = useGrpcQuery<string>({
    queryKey: ["getLidoRewards", JSON.stringify(args)],
    queryFn: async () => {
      const { response } = await ethereanClient.getLidoRewards(args);
      return response.rewards;
    },
  });

  return {
    data: { rewards },
    loading: isLoading,
    error,
    refetch,
  };
};

export default useRewards;
