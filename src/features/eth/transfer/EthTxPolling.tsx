import { useWaitForTransaction } from "wagmi";
import TxPolling from "@/components/transaction/polling";
import { TxHash } from "@/components/transaction/types";

type EthTxPollingProps = {
  advance: () => void;
  restart: () => void;
  hash: TxHash;
};

const EthTxPolling = ({ advance, restart, hash }: EthTxPollingProps) => {
  const { data, error } = useWaitForTransaction({ hash });
  return (
    <TxPolling
      hash={hash}
      isSuccess={Boolean(data)}
      isFailure={Boolean(error)}
      onSuccess={advance}
      onFailure={restart}
    />
  );
};

export default EthTxPolling;
