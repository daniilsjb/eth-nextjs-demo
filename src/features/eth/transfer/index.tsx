import { useState } from "react";
import { Stepper } from "@mantine/core";

import EthTxPrepare from "@/features/eth/transfer/EthTxPrepare";
import EthTxConfirm from "@/features/eth/transfer/EthTxConfirm";
import EthTxPolling from "@/features/eth/transfer/EthTxPolling";
import EthTxCompleted from "@/features/eth/transfer/EthTxCompleted";

import { TxConfig } from "@/features/eth/transfer/types";
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
        <EthTxPrepare advance={advanceFromPrepare} />
      </Stepper.Step>
      <Stepper.Step label="Confirm Transaction" description="Approve the transaction with your wallet.">
        <EthTxConfirm advance={advanceFromConfirm} restart={restart} config={config!} />
      </Stepper.Step>
      <Stepper.Step label="Process Transaction" description="Wait for the transaction to complete.">
        <EthTxPolling advance={advanceFromPolling} restart={restart} hash={hash!} />
      </Stepper.Step>
      <Stepper.Completed>
        <EthTxCompleted restart={restart} hash={hash!} />
      </Stepper.Completed>
    </Stepper>
  );
};

export default Transfer;
