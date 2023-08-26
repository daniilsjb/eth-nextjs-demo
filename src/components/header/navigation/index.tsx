import { usePathname, useRouter } from "next/navigation";
import { NativeSelect } from "@mantine/core";

const Navigation = () => {
  const router = useRouter();
  const path = usePathname();
  const page = path.slice(1).toUpperCase();

  const handleChange = (value: string) => {
    router.push(value.toLowerCase());
  };

  return (
    <NativeSelect
      radius="xl"
      variant="filled"
      value={page}
      data={["ETH", "USDT"]}
      onChange={(e) => handleChange(e.currentTarget.value)}
    />
  );
};

export default Navigation;
