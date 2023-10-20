import {
  UseBaseQueryResult,
  DefaultError,
  useQuery,
} from "@tanstack/react-query";

interface Props<IRes> {
  queryKey: string | any[];
  queryFn: () => Promise<IRes>;
  enabled?: boolean | undefined;
}

const useGrpcQuery = <IRes>({
  queryKey,
  queryFn,
  enabled = true,
}: Props<IRes>): UseBaseQueryResult<IRes, DefaultError> => {
  return useQuery<IRes, DefaultError>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: async () => {
      return await queryFn();
    },
    enabled,
  });
};

export default useGrpcQuery;
