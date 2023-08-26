import { useState } from "react";
import { Stepper } from "@mantine/core";

import UsdtTxPrepare from "@/features/usdt/transfer/UsdtTxPrepare";
import UsdtTxConfirm from "@/features/usdt/transfer/UsdtTxConfirm";
import UsdtTxPolling from "@/features/usdt/transfer/UsdtTxPolling";
import UsdtTxCompleted from "@/features/usdt/transfer/UsdtTxCompleted";

import { TxConfig } from "@/features/usdt/transfer/types";
import { TxHash, TxStage } from "@/components/transaction/types";

const Transfer = () => {
  const [stage, setStage] = useState(TxStage.Prepare);
  const [hash, setHash] = useState<TxHash | null>(null);
  const [config, setConfig] = useState<TxConfig | null>(null);

  const restart = () => {
    setStage(TxStage.Prepare);
  };

  const advanceFromPrepare = (config: TxConfig) => {
    setStage(TxStage.Confirm);
    setConfig(config);
  };

  const advanceFromConfirm = (hash: TxHash) => {
    setStage(TxStage.Polling);
    setHash(hash);
  };

  const advanceFromPolling = () => {
    setStage(TxStage.Complete);
  };

  return (
    <Stepper active={stage} breakpoint="sm">
      <Stepper.Step label="Prepare Transaction" description="Enter your transaction details.">
        <UsdtTxPrepare advance={advanceFromPrepare} />
      </Stepper.Step>
      <Stepper.Step label="Confirm Transaction" description="Approve the transaction with your wallet.">
        <UsdtTxConfirm advance={advanceFromConfirm} restart={restart} config={config!} />
      </Stepper.Step>
      <Stepper.Step label="Process Transaction" description="Wait for the transaction to complete.">
        <UsdtTxPolling advance={advanceFromPolling} restart={restart} hash={hash!} />
      </Stepper.Step>
      <Stepper.Completed>
        <UsdtTxCompleted restart={restart} hash={hash!} />
      </Stepper.Completed>
    </Stepper>
  );
};

export default Transfer;
