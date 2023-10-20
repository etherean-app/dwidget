import { useContext } from "preact/hooks";
import { LidoRewardsRequest } from "@/proto/etherean";
import GrpcContext from "@/contexts/GrpcContext";
import useGrpcQuery from "../useGrpcQuery";

export const useRewards = (args: LidoRewardsRequest) => {
  const { ethereanClient } = useContext(GrpcContext);
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
