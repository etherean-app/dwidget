import {
  SumerFiRequest,
  SummerFiWidgetReply,
} from "@dwidget/shared/proto/etherean";
import { IGrpcContext } from "@/providers";
import { useGrpcContext } from "@dwidget/shared/contexts";
import { useGrpcQuery } from "@dwidget/shared/hooks";

export const useSummerFi = (args: SumerFiRequest) => {
  const { ethereanClient } = useGrpcContext<IGrpcContext>();
  return useGrpcQuery<SummerFiWidgetReply>({
    queryKey: ["getSummerFiWidget", JSON.stringify(args)],
    queryFn: async () => {
      const { response } = await ethereanClient.getSummerFiWidget(args);
      return response;
    },
  });
};

export default useSummerFi;
