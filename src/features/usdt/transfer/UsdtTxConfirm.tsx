import { useEffect } from "react";
import { useContractWrite } from "wagmi";

import TxConfirm from "@/components/transaction/confirm";
import { TxHash } from "@/components/transaction/types";
import { TxConfig } from "@/features/usdt/transfer/types";

type UsdtTxConfirmProps = {
  advance: (hash: TxHash) => void;
  restart: () => void;
  config: TxConfig;
};

const UsdtTxConfirm = ({ advance, restart, config }: UsdtTxConfirmProps) => {
  const { data, error, write } = useContractWrite(config);
  const hash = data?.hash ?? null;

  useEffect(() => {
    write?.();
  }, [write]);

  const handleSuccess = () => advance(hash!);
  const handleFailure = () => restart();

  return (
    <TxConfirm
      isSuccess={Boolean(data)}
      isFailure={Boolean(error)}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
    />
  );
};

export default UsdtTxConfirm;
