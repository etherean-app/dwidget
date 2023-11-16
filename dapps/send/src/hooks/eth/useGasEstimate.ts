// based on https://github.com/lc-labs/register/blob/90ecc46918680de634d92d4e29d12f78aed442b0/src/hooks/useGasEstimate.ts
import { useEffect, useState } from "react";
import { EstimateContractGasParameters } from "viem";
import { useFeeData, useNetwork, usePublicClient } from "wagmi";

export interface GasEstimation {
  isLoading: boolean;
  result: bigint | null;
  estimateEth: bigint | null;
}

const defaultGas: GasEstimation = {
  isLoading: false,
  result: null,
  estimateEth: null,
};

export const useGasEstimate = (
  call: EstimateContractGasParameters | null
): GasEstimation => {
  const { chain } = useNetwork();
  const client = usePublicClient({ chainId: chain?.id });
  const { data: fee } = useFeeData();
  const [state, setState] = useState(defaultGas);

  const estimateGas = async () => {
    // if price data is not ready -> skip
    if (!client || !call || !fee?.gasPrice) {
      setState(defaultGas);
      return;
    }

    setState({ ...defaultGas, isLoading: true });

    try {
      const result = await client.estimateContractGas(call);

      setState({
        isLoading: false,
        result,
        estimateEth: ((result * 150n) / 100n) * fee.gasPrice,
      });
    } catch (e) {
      setState(defaultGas);
    }
  };

  useEffect(() => {
    estimateGas();
  }, [client, fee?.gasPrice, call]);

  return state;
};
