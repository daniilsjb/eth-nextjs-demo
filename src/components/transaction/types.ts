export type TxHash = `0x${string}`;

export type EthUnit = "Ether" | "Gwei" | "Wei";

export enum TxStage {
  Prepare,
  Confirm,
  Polling,
  Complete,
}
