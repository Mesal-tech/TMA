import React from "react";
import { useTonWallet, useTonConnectUI } from "@tonconnect/ui-react";
import { useLaunchParams, useInitData } from "@telegram-apps/sdk-react";
import ConnectButton from "./ConnectButton"
import { useAppKit } from '@reown/appkit/react'

const Header: React.FC = () => {
  const wallet = useTonWallet();
  console.log("wallet", wallet);
  const [tonConnectUI] = useTonConnectUI();
  const initData = useInitData();

  const { open } = useAppKit()

  return (
    <div className="sticky top-0 left-0 bg-black w-full flex justify-between items-center p-[1rem]">
      <div className="flex gap-2 items-center bg-[#333] rounded-lg pr-2 w-full max-w-[8rem]">
        <div className="min-w-10 min-h-10 bg-[#333] rounded-full">
          <img 
            src="/assets/icons/profile-circle.svg" 
            className="w-full h-full object-cover"
            alt="Profile" 
          />
        </div>

        <div className="flex gap-2 items-center py-2 pr-2 max-w-[6rem]">
          <p className="truncate pr-2">@{initData.user.username}</p>
        </div>
      </div>

      <div
        className="h-fit w-fit flex justify-center items-center"
      >
        
        {!wallet ? (
          <button
            onClick={() => open()}
            className={`flex justify-center items-center h-full max-h-[37px] md:max-h-[74px] bg-[#333] text-[14px] md:text-[28px] font-bold rounded-lg p-2`}
          >
            <ConnectButton accountStatus={"avatar"} chainStatus={"icon"} />

            <img 
              src="/assets/icons/wallet.svg" 
              className="w-6 h-6 ml-2" 
            />
          </button>
        ) : (
          <button 
            className={`flex justify-center items-center h-full max-h-[37px] md:max-h-[74px] w-2/3 bg-white text-[14px] md:text-[28px] font-bold rounded-[14px] text-black truncate`}
          >
            Your wallet: <span className="truncate">{wallet?.account?.publicKey}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
