import { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { usePresaleContract } from "../hooks/usePresaleContract";

import { ProgressBar } from "../components/shared";

interface NeutonProps {
  onClose: () => void;
}

const Neuton: React.FC<NeutonProps> = ({ onClose }) => {
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isApprovalStep, setIsApprovalStep] = useState<boolean>(true);

  const {
    contractData,
    buyTokens,
    approveUSDT,
    checkApprovalNeeded,
    isPending,
    isApproving,
    isBuying,
    isSuccess,
    currentAllowance,
  } = usePresaleContract();

  useEffect(() => {
    if (amount) {
      const needsApproval = checkApprovalNeeded(amount);
      setIsApprovalStep(needsApproval);
    }
  }, [amount, currentAllowance, checkApprovalNeeded]);

  // Format large numbers for display
  const formatDisplayValue = (value: bigint | undefined): string => {
    if (!value) return "0";
    const formatted = formatEther(value);
    return parseFloat(formatted).toString();
  };

  // Format specifically for K notation (e.g., 10K TON)
  const formatKValue = (value: bigint | undefined): string => {
    if (!value) return "0K";
    const formatted = formatEther(value);
    const number = parseFloat(formatted);
    if (number >= 1000) {
      return (number / 1000).toString() + "K";
    }
    return number.toString();
  };

  // Timer effect
  useEffect(() => {
    if (!contractData.endTime) return;

    const updateTimer = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = Number(contractData.endTime) - now;

      if (remaining <= 0) {
        setTimeLeft("Presale ended");
        return;
      }

      const days = Math.floor(remaining / 86400);
      const hours = Math.floor((remaining % 86400) / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      const seconds = remaining % 60;

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s LEFT`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [contractData.endTime]);

  // Handle transaction (either approve or buy)
  const handleTransaction = async (): Promise<void> => {
    if (!isConnected || !amount) return;

    try {
      if (isApprovalStep) {
        console.log("Initiating approval...");
        await approveUSDT(amount);
        //toast.success("Approval successful! You can now buy tokens.");
        setIsApprovalStep(false);
      } else {
        console.log("Initiating purchase...");
        await buyTokens(amount);
        if (isSuccess) {
          setAmount("");
          setIsApprovalStep(true);
        }
      }
    } catch (err) {
      console.error("Transaction failed:", err);
    }
  };

  // Get button text based on current state
  const getButtonText = (): string => {
    if (isApproving) return "Approving...";
    if (isBuying) return "Buying...";
    if (isApprovalStep) return `Approve ${amount || 0} TON`;
    return `Buy ${amount || 0} NEUTON`;
  };

  // Button disabled state
  const isButtonDisabled = (): boolean => {
    return !isConnected || isPending || !amount || parseFloat(amount) <= 0;
  };

  const formatDate = (timestamp: bigint | undefined): string => {
    if (!timestamp) return "--/--/----";
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '/');
  };
  
  const formatTime = (timestamp: bigint | undefined): string => {
    if (!timestamp) return "--:--";
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate progress
  const calculateProgress = (): number => {
    if (!contractData.totalRaised || !contractData.hardCap) return 0;
    return Number(
      (contractData.totalRaised * BigInt(100)) / contractData.hardCap
    );
  };

  const progressSections = [
    { color: "#FF4D4F", percentage: 25 }, // Red Section
    { color: "#FAAD14", percentage: 30 }, // Yellow Section
    { color: "#52C41A", percentage: 45 }, // Green Section
  ];

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col gap-2 pb-[4rem]"
    >
      <div className="relative">
        <img
          src="/assets/images/NeutonImage.png"
          alt="Neuton"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* Black overlay */}
        <div className="z-[1] h-full bg-black opacity-50 absolute top-0 left-0 w-full"></div>

        <div className="px-[1rem] relative z-[10]">
          <div className="z-[100] flex flex-col gap-2 w-full">
            <div className="flex gap-[2px] items-center">
              <div className="rounded-full w-14 h-14 overflow-hidden flex justify-center items-center">
                <img
                  src="/assets/images/NetonImage.png"
                  alt="Neuton"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="font-bold text-white text-[1.4rem]">Neuton</h2>
            </div>

            <div className="my-2 flex gap-2 items-center px-2">
              <button>
                <img
                  src="/assets/icons/Telegram.png"
                  alt="Telegram"
                  className="w-6 h-6"
                />
              </button>

              <button>
                <img
                  src="/assets/icons/Twitter.png"
                  alt="Twitter"
                  className="w-6 h-6"
                />
              </button>

              <button>
                <img
                  src="/assets/icons/Web.png"
                  alt="Web"
                  className="w-6 h-6"
                />
              </button>

              <button>
                <img
                  src="/assets/icons/Papers.png"
                  alt="Papers"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>

          <div className="z-[200] p-4 p-2 w-full flex flex-col justify-between gap-4">
            <div className="flex justify-between items-center">
              <div className="bg-black p-2 rounded-lg flex flex-col gap-2 items-center shadow-white-glow drop-shadow-[0_4px_10px_rgba(0,72,255,0.1)]/20 border border-white/10">
                <div className="flex gap-2 items-center">
                  <img
                    src="/assets/icons/Diamond.png"
                    alt="Diamond"
                    className="w-6 h-6 object-cover"
                  />

                  <h2 className="truncate">HARD CAP</h2>
                </div>

                <h2 className="font-bold text-white text-[1.2rem]">
                  {formatKValue(contractData.hardCap)} Ton
                </h2>
              </div>

              <div className="bg-black p-2 rounded-lg flex flex-col gap-2 items-center shadow-white-glow drop-shadow-[0_4px_10px_rgba(0,72,255,0.1)]/20 border border-white/10">
                <div className="flex gap-2 items-center">
                  <img
                    src="/assets/icons/Diamond.png"
                    alt="Diamond"
                    className="w-6 h-6 object-cover"
                  />

                  <h2 className="truncate">SOFT CAP</h2>
                </div>

                <h2 className="font-bold text-white text-[1.2rem]">
                  {formatKValue(contractData.softCap)} Ton
                </h2>
              </div>
            </div>

            <div className="flex flex-col space-y-[4px]">
              <ProgressBar sections={progressSections} height="6px" />

              <div className="w-full flex justify-between items-start">
                <div>
                  <div>
                    <div className="flex itmes-center gap-[2px]">
                      <img
                        src="/assets/icons/calendar.svg"
                        alt="Calendar"
                        className="w-[12px] h-[12px] invert-white"
                      />
                       <p className="text-[9px] font-bold">{formatDate(contractData.startTime)}</p>
                    </div>

                    <div className="flex itmes-center gap-[2px]">
                      <img
                        src="/assets/icons/clock.svg"
                        alt="Clock"
                        className="w-[12px] h-[12px] invert-white"
                      />
                      <p className="text-[9px] font-bold">{formatTime(contractData.startTime)}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex itmes-center gap-[2px]">
                    <img
                      src="/assets/icons/timer.svg"
                      alt="Timer"
                      className="w-[12px] h-[12px] invert-white"
                    />
                     <p className="text-[9px] font-bold">{timeLeft}</p>
                  </div>
                </div>

                <div>
                  <div>
                    <div className="flex itmes-center gap-[2px]">
                      <img
                        src="/assets/icons/calendar.svg"
                        alt="Calendar"
                        className="w-[12px] h-[12px] invert-white"
                      />
                      <p className="text-[9px] font-bold">{formatDate(contractData.endTime)}</p>
                    </div>

                    <div className="flex itmes-center gap-[2px]">
                      <img
                        src="/assets/icons/clock.svg"
                        alt="Clock"
                        className="w-[12px] h-[12px] invert-white"
                      />
                      <p className="text-[9px] font-bold">{formatTime(contractData.endTime)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[1.8rem] flex flex-col gap-2 w-full">
        <div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-4 items-end">
              <div className="rounded-xl border flex-1 h-[4.5rem] max-w-[50%] text-[12px] flex flex-col w-full text-center">
                <span className="text-white p-2 px-4 font-bold">MIN BUY</span>

                <hr className="border w-full m-0" />

                <span className="text-white p-2 px-4 truncate font-bold">
                  {formatDisplayValue(contractData.minPurchase)}
                </span>
              </div>

              <div className="overflow-hidde relative rounded-xl flex-1 h-[4rem] max-w-[50%] bg-[#333] border w-full text-center flex items-end justify-center">
                <div className="absolute top-[-20%] left-0 w-full px-2">
                  <p className="w-full bg-white rounded-xl text-black p-2 text-[12px] font-bold">
                    USDT Balance:
                  </p>
                </div>

                <h2 className="text-white text-[15px] p-2 px-4 font-bold truncate gap-2 items-center">
                  {parseFloat(formatDisplayValue(contractData.userUsdtBalance)).toFixed(2)} USDT
                </h2>
              </div>
            </div>

            <div className="flex justify-between gap-4 items-end">
              <div className="rounded-xl border flex-1 h-[4.5rem] max-w-[50%] text-[12px] flex flex-col w-full text-center">
                <span className="text-white p-2 px-4 font-bold">MAX BUY</span>

                <hr className="border w-full m-0" />

                <span className="text-white p-2 px-4 truncate font-bold">
                  {formatDisplayValue(contractData.maxPurchase)}
                </span>
              </div>

              <div className="relative rounded-xl flex-1 h-[4rem] max-w-[50%] bg-[#333] border w-full text-center flex items-end justify-center">
                <div className="absolute top-[-20%] left-0 w-full px-2">
                  <p className="w-full bg-white rounded-xl text-black p-2 text-[12px] font-bold">
                    Neuton Balance:
                  </p>
                </div>

                <h2 className="text-white text-[15px] truncate p-2 px-4 font-bold">
                  {parseFloat(formatDisplayValue(contractData.userBalance)).toFixed(5)} Neuton
                </h2>
              </div>
            </div>
          </div>

          <p className="my-2 text-center w-full">Price 1 Neuton =  {contractData.price ? contractData.price.toString() : "0"} USDT</p>
        </div>

        <div className="w-full flex flex-col items-center space-y-4">
          {/* Input Field */}
          <div className="w-full relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-transparent 
               border border-gray-600 rounded-lg
               text-white placeholder-gray-400 
               focus:outline-none focus:border-blue-500
               disabled:opacity-50 disabled:cursor-not-allowed
               text-center font-medium"
              disabled={isPending || isApproving}
              placeholder="Enter token amount"
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 
                   text-white font-medium"
            >
              USDT
            </span>
          </div>

          {/* Amount You'll Get */}
          <div className="w-full text-right text-sm text-gray-400">
          <p>~ You'll get {contractData.getTokenBalance ? contractData.getTokenBalance.toString() : "0"} NEUTON</p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleTransaction}
            disabled={isButtonDisabled()}
            className={`
      w-full max-w-[200px] py-3 px-6 rounded-lg 
      font-bold text-base text-black
      transition-all duration-200 ease-in-out
      ${
        isButtonDisabled()
          ? "bg-gray-600 cursor-not-allowed opacity-50"
          : "bg-white hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
      }
    `}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Neuton;
