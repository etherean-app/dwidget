import { AssetsRequest, AssetsResponse } from "@dwidget/shared/proto/assets";
import { useGrpcContext } from "@dwidget/shared/contexts";
import { useGrpcQuery } from "@dwidget/shared/hooks";
import { IGrpcContext } from "@/providers";

export const useAssets = (args: AssetsRequest) => {
  const { assetsClient } = useGrpcContext<IGrpcContext>();
  return useGrpcQuery<AssetsResponse>({
    queryKey: ["getAssets", JSON.stringify(args)],
    queryFn: async () => {
      const { response } = await assetsClient.getAssets(args);
      return response;
    },
    enabled: !!args.wallet,
  });
};

export default useAssets;
