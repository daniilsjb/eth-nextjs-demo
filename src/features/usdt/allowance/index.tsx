import { useEffect } from "react";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { formatUnits } from "viem";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { Button, Container, Group, Text, TextInput } from "@mantine/core";
import { IconAt, IconMoneybag } from "@tabler/icons-react";

import { USDT_ALLOWANCE, USDT_APPROVE, USDT_DECIMALS } from "@/features/usdt/constants";
import { parseAddressOrNull, parseUsdtAmountOrNull } from "@/components/transaction/utils";

const showTransactionCancelledNotification = () => {
  notifications.show({
    title: "Transaction cancelled",
    message: "This transaction was rejected and will not get executed.",
    color: "red",
  });
};

const showPollingFailedNotification = () => {
  notifications.show({
    title: "Polling failed",
    message: "Something went wrong while monitoring the transaction.",
    color: "red",
  });
};

const showTransactionCompletedNotification = () => {
  notifications.show({
    title: "Transaction completed",
    message: "Your transaction has been completed successfully.",
    color: "green",
  });
};

const validateRecipient = (value: string): string | null => {
  const parsedRecipient = parseAddressOrNull(value);
  return !parsedRecipient ? "Invalid spender address." : null;
};

const validateAmount = (value: string): string | null => {
  const parsedAmount = parseUsdtAmountOrNull(value);
  return parsedAmount === null ? "Invalid amount of USDT." : null;
};

const Allowance = () => {
  const form = useForm({
    initialValues: { spender: "", amount: "" },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      spender: (value) => validateRecipient(value),
      amount: (value) => validateAmount(value),
    },
    transformValues: ({ spender, amount }) => ({
      spender: parseAddressOrNull(spender) ?? undefined,
      amount: parseUsdtAmountOrNull(amount) ?? undefined,
    }),
  });

  const { spender: _spender, amount: _amount } = form.getTransformedValues();
  const [spender] = useDebouncedValue(_spender, 500);
  const [amount] = useDebouncedValue(_amount, 500);

  const { address: owner } = useAccount();
  const { data: allowance } = useContractRead(
    owner && spender ? { ...USDT_ALLOWANCE, args: [owner, spender], watch: true } : {},
  );

  const spenderHasAllowance = Boolean(allowance);

  const {
    config,
    error: _prepareError,
    isSuccess: prepareIsSuccess,
    isLoading: _prepareIsLoading,
  } = usePrepareContractWrite(
    spender
      ? spenderHasAllowance
        ? { ...USDT_APPROVE, args: [spender, BigInt(0)] }
        : amount
        ? { ...USDT_APPROVE, args: [spender, amount] }
        : {}
      : {},
  );

  const {
    write,
    data: writeData,
    error: writeError,
    isLoading: writeIsLoading,
  } = useContractWrite({
    ...config,
  });

  useEffect(() => {
    if (!writeError) return;
    showTransactionCancelledNotification();
  }, [writeError]);

  const {
    data: pollData,
    error: pollError,
    isLoading: pollIsLoading,
  } = useWaitForTransaction({
    hash: writeData?.hash,
  });

  useEffect(() => {
    if (!pollIsLoading) return;
    form.setFieldValue("amount", "");
  }, [pollIsLoading, form]);

  useEffect(() => {
    if (!pollError) return;
    showPollingFailedNotification();
  }, [pollError]);

  useEffect(() => {
    if (!pollData) return;
    showTransactionCompletedNotification();
  }, [pollData]);

  const [prepareError] = useDebouncedValue(_prepareError, 500);
  const [prepareIsLoading] = useDebouncedValue(_prepareIsLoading, 500);

  const hasDebounced = spender == _spender && amount === _amount;
  const isSubmissionLoading = prepareIsLoading || writeIsLoading || pollIsLoading;
  const isSubmissionDisabled = !isSubmissionLoading && (!prepareIsSuccess || !hasDebounced);

  return (
    <Container size="xs">
      <Text mt="md" ta="center">
        {allowance !== undefined
          ? `Current allowance is ${formatUnits(allowance, USDT_DECIMALS)} USDT.`
          : `Enter spender address to view allowance.`}
      </Text>

      <TextInput
        label="Spender"
        placeholder="0x19f...2f17"
        icon={<IconAt size={16} />}
        {...form.getInputProps("spender")}
      />

      <TextInput
        label="Amount"
        placeholder="0.01"
        icon={<IconMoneybag size={16} />}
        {...form.getInputProps("amount")}
        disabled={spenderHasAllowance}
      />

      {spenderHasAllowance ? (
        <Group position="apart" mt="md">
          <Text color="dimmed" align="right" size="xs">
            Cannot change non-zero allowance, you must reset it first.
          </Text>
          <Button loading={isSubmissionLoading} onClick={() => write?.()}>
            Reset
          </Button>
        </Group>
      ) : (
        <Group position="right" mt="md">
          <Button disabled={isSubmissionDisabled} loading={isSubmissionLoading} onClick={() => write?.()}>
            Approve
          </Button>
        </Group>
      )}

      {prepareError && (
        <>
          <Text color="red" align="right" mt="xs">
            Encountered an error while preparing the transaction.
          </Text>
          <Text color="red" align="right" size="xs">
            (Code: {prepareError.name}) {prepareError.message}
          </Text>
        </>
      )}
    </Container>
  );
};

export default Allowance;
