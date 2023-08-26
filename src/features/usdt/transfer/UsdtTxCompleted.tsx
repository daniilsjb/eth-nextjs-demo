import TxCompleted from "@/components/transaction/completed";
import { TxHash } from "@/components/transaction/types";

type UsdtTxCompletedProps = {
  hash: TxHash;
  restart: () => void;
};

const UsdtTxCompleted = ({ hash, restart }: UsdtTxCompletedProps) => {
  return <TxCompleted hash={hash} restart={restart} />;
};

export default UsdtTxCompleted;
