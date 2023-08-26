import { useEffect } from "react";
import { useSendTransaction } from "wagmi";

import TxConfirm from "@/components/transaction/confirm";
import { TxHash } from "@/components/transaction/types";
import { TxConfig } from "@/features/eth/transfer/types";

type EthTxConfirmProps = {
  advance: (hash: TxHash) => void;
  restart: () => void;
  config: TxConfig;
};

const EthTxConfirm = ({ advance, restart, config }: EthTxConfirmProps) => {
  const { data, error, sendTransaction } = useSendTransaction(config);
  const hash = data?.hash ?? null;

  useEffect(() => {
    sendTransaction?.();
  }, [sendTransaction]);

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

export default EthTxConfirm;
