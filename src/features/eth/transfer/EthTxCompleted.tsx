import TxCompleted from "@/components/transaction/completed";
import { TxHash } from "@/components/transaction/types";

type EthTxCompletedProps = {
  hash: TxHash;
  restart: () => void;
};

const EthTxCompleted = ({ hash, restart }: EthTxCompletedProps) => {
  return <TxCompleted hash={hash} restart={restart} />;
};

export default EthTxCompleted;
