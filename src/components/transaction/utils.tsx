import { Address, getAddress, parseEther, parseGwei, parseUnits } from "viem";

import { EthUnit } from "@/components/transaction/types";
import { USDT_DECIMALS } from "@/features/usdt/constants";

export const parseAddressOrNull = (value: string): Address | null => {
  try {
    return getAddress(value.trim());
  } catch (_) {
    return null;
  }
};

export const parseEthAmountOrNull = (value: string, unit: EthUnit = "Ether"): bigint | null => {
  try {
    switch (unit) {
      case "Ether":
        return parseEther(value.trim());
      case "Gwei":
        return parseGwei(value.trim());
      case "Wei":
        return BigInt(value.trim());
    }
  } catch (_) {
    return null;
  }
};

export const parseUsdtAmountOrNull = (value: string): bigint | null => {
  try {
    return parseUnits(value.trim(), USDT_DECIMALS);
  } catch (_) {
    return null;
  }
};
