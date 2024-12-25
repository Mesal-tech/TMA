import React from "react";

export const Nft: React.FC = () => {
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
          src="/assets/images/nft-img.png"
          alt="NFT Center Image"
          className="w-full max-w-[350px] object-contain"
        />
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-16 left-0 w-full flex flex-col items-center text-center leading-tight">
        <p className="text-lg font-semibold font-krub mb-[-8px]">Discover exclusive</p>

        {/* Blurry Shadow Effect */}
        <div className="relative">
          {/* Blurry Shadow Text */}
          <p
            className="absolute top-1 text-[80px] font-extrabold font-krub text-gray-200 opacity-70 blur-[2px]"
            style={{ zIndex: 0 }}
          >
            NFTs!
          </p>

          {/* Main Text */}
          <p
            className="relative text-[80px] font-extrabold font-krub text-white z-10"
          >
            NFTs!
          </p>
        </div>
      </div>
    </div>
  );
};