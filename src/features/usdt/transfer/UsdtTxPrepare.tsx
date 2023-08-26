import { usePrepareContractWrite } from "wagmi";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { IconAt, IconMoneybag } from "@tabler/icons-react";
import { Button, Container, Group, Text, TextInput } from "@mantine/core";

import { USDT_TRANSFER } from "@/features/usdt/constants";
import { TxConfig } from "@/features/usdt/transfer/types";
import { parseAddressOrNull, parseUsdtAmountOrNull } from "@/components/transaction/utils";
import useVerifyRecipient from "@/components/transaction/use-verify-recipient";

const validateRecipient = (value: string): string | null => {
  const parsedRecipient = parseAddressOrNull(value);
  return !parsedRecipient ? "Invalid recipient address." : null;
};

const validateAmount = (value: string): string | null => {
  const parsedAmount = parseUsdtAmountOrNull(value);
  return !parsedAmount || parsedAmount <= 0 ? "Invalid amount of USDT." : null;
};

type UsdtTxPrepareProps = {
  advance: (config: TxConfig) => void;
};

const UsdtTxPrepare = ({ advance }: UsdtTxPrepareProps) => {
  const form = useForm({
    initialValues: { recipient: "", amount: "" },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      recipient: (value) => validateRecipient(value),
      amount: (value) => validateAmount(value),
    },
    transformValues: ({ recipient, amount }) => ({
      recipient: parseAddressOrNull(recipient) ?? undefined,
      amount: parseUsdtAmountOrNull(amount) ?? undefined,
    }),
  });

  const { recipient: _to, amount: _value } = form.getTransformedValues();
  const [to] = useDebouncedValue(_to, 500);
  const [value] = useDebouncedValue(_value, 500);

  const {
    config,
    error: _error,
    isLoading: _isLoading,
    isSuccess,
  } = usePrepareContractWrite(to && value ? { ...USDT_TRANSFER, args: [to, value] } : {});

  const { verifyAsync } = useVerifyRecipient({ address: to });

  const handleCancel = form.reset;
  const handleSubmit = form.onSubmit(async () => {
    await verifyAsync?.({ onConfirm: () => advance(config) });
  });

  const [error] = useDebouncedValue(_error, 500);
  const [isLoading] = useDebouncedValue(_isLoading, 500);

  const hasDebounced = to === _to && value === _value;
  const isSubmissionDisabled = !isLoading && (!isSuccess || !hasDebounced);

  return (
    <Container size="xs">
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Recipient"
          placeholder="0x19f...2f17"
          icon={<IconAt size={16} />}
          {...form.getInputProps("recipient")}
        />

        <TextInput
          label="Amount"
          placeholder="0.01"
          icon={<IconMoneybag size={16} />}
          {...form.getInputProps("amount")}
        />

        <Group position="right" mt="md">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={isSubmissionDisabled} loading={isLoading} type="submit">
            Transfer
          </Button>
        </Group>
      </form>

      {error && (
        <>
          <Text color="red" align="right" mt="xs">
            Encountered an error while preparing the transaction.
          </Text>
          <Text color="red" align="right" size="xs">
            (Code: {error.name})
          </Text>
        </>
      )}
    </Container>
  );
};

export default UsdtTxPrepare;
