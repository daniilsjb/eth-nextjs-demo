import { useWaitForTransaction } from "wagmi";
import TxPolling from "@/components/transaction/polling";
import { TxHash } from "@/components/transaction/types";

type UsdtTxPollingProps = {
  advance: () => void;
  restart: () => void;
  hash: TxHash;
};

const UsdtTxPolling = ({ advance, restart, hash }: UsdtTxPollingProps) => {
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

export default UsdtTxPolling;
