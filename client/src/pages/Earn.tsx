import React from "react";

export const Earn: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white fixed top-0 left-0 w-full h-screen flex items-center justify-center">
      {/* Top Image */}
      <div className="absolute top-0 left-0 w-full flex justify-center">
        <img
          src="/assets/images/soon.png"
          alt="Coming Soon"
          className="w-full max-w-[600px] object-contain"
        />
      </div>

      {/* Center Image */}
      <div className="flex items-center justify-center">
        <img
          src="/assets/images/hand.png"
          alt="NFT Center Image"
          className="w-full max-w-[350px] object-contain"
        />
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-24 left-0 w-full flex flex-col items-center text-center leading-tight">
        <p className="text-lg font-semibold font-krub"> <span className="text-[26px]">Earn </span>rewards effortlessly with <br /> our upcoming <span className="text-[26px]"> staking</span> options!</p>
      </div>
    </div>
  );
};