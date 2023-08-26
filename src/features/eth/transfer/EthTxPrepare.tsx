import { usePrepareSendTransaction } from "wagmi";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { Button, Container, Group, NativeSelect, rem, Text, TextInput } from "@mantine/core";
import { IconAt, IconCurrencyEthereum, IconMoneybag } from "@tabler/icons-react";

import { TxConfig } from "@/features/eth/transfer/types";
import { EthUnit } from "@/components/transaction/types";
import { parseAddressOrNull, parseEthAmountOrNull } from "@/components/transaction/utils";
import useVerifyRecipient from "@/components/transaction/use-verify-recipient";

const validateRecipient = (value: string): string | null => {
  const parsedRecipient = parseAddressOrNull(value);
  return !parsedRecipient ? "Invalid recipient address." : null;
};

const validateAmount = (value: string, unit: EthUnit): string | null => {
  const parsedAmount = parseEthAmountOrNull(value, unit);
  return !parsedAmount || parsedAmount <= 0 ? `Invalid amount of ${unit}.` : null;
};

type TransactionPrepareProps = {
  advance: (config: TxConfig) => void;
};

const EthTxPrepare = ({ advance }: TransactionPrepareProps) => {
  const form = useForm({
    initialValues: {
      recipient: "",
      amount: "",
      unit: "Ether" as EthUnit,
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      recipient: (value) => validateRecipient(value),
      amount: (value, { unit }) => validateAmount(value, unit),
    },
    transformValues: ({ recipient, amount, unit }) => ({
      recipient: parseAddressOrNull(recipient) ?? undefined,
      amount: parseEthAmountOrNull(amount, unit) ?? undefined,
    }),
  });

  const { recipient: _to, amount: _value } = form.getTransformedValues();
  const [to] = useDebouncedValue(_to, 500);
  const [value] = useDebouncedValue(_value, 500);

  const options = to && value ? { to, value } : {};
  const { config, error: _error, isLoading: _isLoading, isSuccess } = usePrepareSendTransaction(options);

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
          rightSection={
            <NativeSelect
              icon={<IconCurrencyEthereum size={20} />}
              data={["Ether", "Gwei", "Wei"]}
              styles={{ input: { width: rem(110) } }}
              {...form.getInputProps("unit")}
              onChange={(e) => {
                // Whenever the unit is changed, we must revalidate the amount since the parsing logic may have changed.
                // Unfortunately, changes in this element will not cause an error message to appear under the amount
                // field if validation fails, so we must programmatically "touch" the amount to validate it again.
                form.setFieldValue("unit", e.currentTarget.value as EthUnit);
                form.setFieldValue("amount", form.values.amount);
              }}
            />
          }
          rightSectionWidth={rem(110)}
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

export default EthTxPrepare;
