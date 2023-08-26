import { useCallback, useEffect } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { mainnet } from "wagmi/chains";
import { notifications } from "@mantine/notifications";
import openWarningModal from "@/components/modals/warning";

type UnsupportedNetworkModal = {
  switchToMainnet: () => void;
};

const openUnsupportedChainModal = ({ switchToMainnet }: UnsupportedNetworkModal) => {
  openWarningModal({
    title: "Unsupported network",
    message: `You are attempting to switch to a chain that is not supported by this application.
      Do you wish to connect to the Ethereum mainnet instead?`,
    onConfirm: switchToMainnet,
  });
};

type NonMainnetChainModal = {
  switchToMainnet: () => void;
};

const openNonMainnetChainModal = ({ switchToMainnet }: NonMainnetChainModal) => {
  openWarningModal({
    title: "Non-mainnet chain",
    message: `You are attempting to switch to a chain that is not Ethereum mainnet. 
      Would you like to connect to the mainnet instead?`,
    onConfirm: switchToMainnet,
  });
};

const showSwitchingCancelledNotification = () => {
  notifications.show({
    title: "Network switching cancelled",
    message: "Request to switch networks was cancelled.",
    color: "red",
  });
};

const showSwitchingUnsupportedNotification = () => {
  notifications.show({
    title: "Could not switch to mainnet",
    message: "Your wallet does not support automatic network switching.",
    color: "red",
  });
};

const DetectNetworkChange = () => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
    onError: showSwitchingCancelledNotification,
  });

  const switchToMainnet = useCallback(() => {
    try {
      switchNetwork?.(mainnet.id);
    } catch (_) {
      showSwitchingUnsupportedNotification();
    }
  }, [switchNetwork]);

  useEffect(() => {
    if (!chain) return;

    if (chain.unsupported) {
      openUnsupportedChainModal({ switchToMainnet });
    } else if (chain.name !== mainnet.name) {
      openNonMainnetChainModal({ switchToMainnet });
    }
  }, [chain, switchToMainnet]);

  return null;
};

export default DetectNetworkChange;
