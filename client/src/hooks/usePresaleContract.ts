"use client";

import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther, parseUnits } from "viem";
import { presaleAbi, usdtAbi } from "../constants/abi";
import { presaleAddress, usdtAddress } from "../constants/index";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface ContractData {
  price: bigint | undefined;
  softCap: bigint | undefined;
  hardCap: bigint | undefined;
  totalRaised: bigint | undefined;
  startTime: bigint | undefined;
  endTime: bigint | undefined;
  minPurchase: bigint | undefined;
  maxPurchase: bigint | undefined;
  userBalance: bigint | undefined;
  userUsdtBalance: bigint | undefined;
  getTokenBalance: bigint | undefined;
}

interface PresaleContractReturn {
  contractData: ContractData;
  buyTokens: (amount: string) => Promise<void>;
  approveUSDT: (amount: string) => Promise<void>;
  checkApprovalNeeded: (amount: string) => boolean;
  currentAllowance: bigint | undefined;
  isPending: boolean;
  isApproving: boolean;
  isBuying: boolean;
  isSuccess: boolean;
}

export const usePresaleContract = (): PresaleContractReturn => {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>("");
  const [needsApproval, setNeedsApproval] = useState<boolean>(false);

  // Log connected address
  useEffect(() => {
    if (address) {
      console.log(`Connected Address: ${address}`);
    }
  }, [address]);

  // Read Contract States
  const { data: price } = useReadContract({
    abi: presaleAbi,
    address: presaleAddress,
    functionName: "price",
  });

  const { data: softCap } = useReadContract({
    abi: presaleAbi,
    address: presaleAddress,
    functionName: "softCap",
  });

  const { data: hardCap } = useReadContract({
    abi: presaleAbi,
    address: presaleAddress,
    functionName: "hardCap",
  });

  const { data: totalRaised } = useReadContract({
    abi: presaleAbi,
    address: presaleAddress,
    functionName: "totalRaised",
  });

  const { data: startTime } = useReadContract({
    abi: presaleAbi,
    address: presaleAddress,
    functionName: "startTime",
  });

  const { data: endTime } = useReadContract({
    abi: presaleAbi,
    address: presaleAddress,
    functionName: "endTime",
  });

  const { data: minPurchase } = useReadContract({
    abi: presaleAbi,
    address: presaleAddress,
    functionName: "minPurchase",
  });

  const { data: maxPurchase } = useReadContract({
    abi: presaleAbi,
    address: presaleAddress,
    functionName: "maxPurchase",
  });

  const { data: userBalance } = useReadContract({
    abi: presaleAbi,
    address: presaleAddress,
    functionName: "contributions",
    args: [address as `0x${string}`],
  });

  // Log user balance
  useEffect(() => {
    if (userBalance) {
      console.log(`User Balance: ${userBalance}`);
    }
  }, [userBalance]);

  const { data: currentAllowance, refetch: refetchAllowance } = useReadContract(
    {
      abi: usdtAbi,
      address: usdtAddress,
      functionName: "allowance",
      args:
        address && presaleAddress
          ? [address as `0x${string}`, presaleAddress]
          : undefined,
      query: {
        enabled: Boolean(address && presaleAddress),
      },
    }
  );

  const { data: userUsdtBalance } = useReadContract({
    abi: usdtAbi,
    address: usdtAddress,
    functionName: "balanceOf",
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  // First, update your read call with the correct args
  const { data: getTokenBalance, refetch: refetchTokenBalance } =
    useReadContract({
      abi: presaleAbi,
      address: presaleAddress,
      functionName: "calculateTokenAmount",
      // Need to pass the USDT amount here
      args: amount ? [parseUnits(amount, 6)] : undefined,
      query: {
        enabled: Boolean(amount), // Only enable when amount exists
      },
    });

  useEffect(() => {
    if (address && presaleAddress) {
      console.log("Allowance check parameters:", {
        owner: address,
        spender: presaleAddress,
        currentAllowance: currentAllowance
          ? currentAllowance.toString()
          : "undefined",
        usdtAddress,
      });
    }
  }, [address, currentAllowance]);

  // Write Contracts
  const {
    writeContract: writeApprove,
    data: approveHash,
    isPending: isApprovePending,
    isError: approveWriteError,
  } = useWriteContract();

  const {
    writeContract: writeBuy,
    data: buyHash,
    isPending: isBuyPending,
    isError: buyWriteError,
  } = useWriteContract();

  // Wait for Transaction Receipt
  const {
    isLoading: isApproveConfirming,
    isSuccess: isApproveSuccess,
    error: approveError,
  } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const {
    isLoading: isBuyConfirming,
    isSuccess: isBuySuccess,
    error: buyError,
  } = useWaitForTransactionReceipt({
    hash: buyHash,
  });

  // Toast Notifications for Transactions
  useEffect(() => {
    if (isApproveSuccess) {
      toast.success("Token approval successful");
      console.log(`Approval Successful: ${approveHash}`);
    }
    if (approveError || approveWriteError) {
      toast.error("Token approval failed");
      console.error("Approval Error:", approveError || approveWriteError);
    }
  }, [isApproveSuccess, approveError, approveWriteError, approveHash]);

  useEffect(() => {
    if (isBuySuccess) {
      toast.success("Purchase successful");
      console.log(`Purchase Successful: ${buyHash}`);
    }
    if (buyError || buyWriteError) {
      toast.error("Purchase failed");
      console.error("Purchase Error:", buyError || buyWriteError);
    }
  }, [isBuySuccess, buyError, buyWriteError, buyHash]);

  const checkApprovalNeeded = (amount: string): boolean => {
    if (!amount || !currentAllowance) return true;
    try {
      const amountInUSDT = parseUnits(amount, 6);
      return BigInt(currentAllowance) < BigInt(amountInUSDT);
    } catch (err) {
      console.error("Error checking approval:", err);
      return true;
    }
  };

  // Separate approve function
  const approveUSDT = async (amount: string): Promise<void> => {
    if (!address) return;
    try {
      //const amountInWei = parseEther(amount);
      const amountInUSDT = parseUnits(amount, 6);
      console.log(`Approving ${amountInUSDT} USDT for presale...`);
      await writeApprove({
        abi: usdtAbi,
        address: usdtAddress,
        functionName: "approve",
        args: [presaleAddress, amountInUSDT],
      });
      // Wait for approval to be mined
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await refetchAllowance();
    } catch (err) {
      console.error("Approval failed:", err);
      throw err;
    }
  };

  const buyTokens = async (amount: string): Promise<void> => {
    if (!amount || !address) return;
    try {
      const amountInUSDT = parseUnits(amount, 6);
      console.log("amountInWei", amountInUSDT);
      await writeBuy({
        abi: presaleAbi,
        address: presaleAddress,
        functionName: "buyTokens",
        args: [amountInUSDT],
      });
    } catch (err) {
      console.error("Buy failed:", err);
      toast.error("Token purchase failed");
      throw err;
    }
  };

  return {
    contractData: {
      price,
      softCap,
      hardCap,
      totalRaised,
      startTime,
      endTime,
      minPurchase,
      maxPurchase,
      userBalance,
      userUsdtBalance,
      getTokenBalance,
    },
    buyTokens,
    approveUSDT,
    checkApprovalNeeded,
    currentAllowance,
    isPending: isApprovePending || isBuyPending,
    isApproving: isApprovePending || isApproveConfirming,
    isBuying: isBuyPending || isBuyConfirming,
    isSuccess: isApproveSuccess || isBuySuccess,
  };
};
