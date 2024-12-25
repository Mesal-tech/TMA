import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProgressBar } from "../components/shared";

// Define an Item interface for the items list
interface Item {
  id: number;
  title: string;
  category: string;
  amount: string;
  progress: number;
  daysLeft: number;
  icon: string; 
  progressAmount: string;
}

export const Ico: React.FC = () => {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<string>("ACTIVE");

  const tabs: string[] = ["ACTIVE", "UPCOMING", "ENDED"];
  const items: Item[] = [
    {
      id: 1,
      title: "inSHAPE",
      category: "Blockchain Service",
      amount: "$1,280 USDT",
      progress: 30,
      daysLeft: 9,
      icon: "/assets/icons/inshape.svg",
      progressAmount: "7,000 / 20,000 USDT"
    },
    {
      id: 2,
      title: "Arrakis",
      category: "Protocol",
      amount: "$1,000 USDT",
      progress: 10,
      daysLeft: 11,
      icon: "/assets/icons/arrakis.svg",
      progressAmount: "4,000 / 20,000 USDT"
    },
    {
      id: 3,
      title: "MetaCloud",
      category: "VR",
      amount: "$900 USDT",
      progress: 45,
      daysLeft: 19,
      icon: "/assets/icons/metacloud.svg",
      progressAmount: "9,000 / 20,000 USDT"
    },
    {
      id: 4,
      title: "inSHAPE",
      category: "Blockchain Service",
      amount: "$900 USDT",
      progress: 45,
      daysLeft: 19,
      icon: "/assets/icons/inshape.svg",
      progressAmount: "4,000 / 20,000 USDT"
    },
  ];

  return (
    <div className="text-white h-screen overflow-scroll pb-[10rem]">
      {/* Header */}
      <div className="fixed top-[4rem] left-0 w-full bg-black z-10">
        <div className="flex justify-between items-center bg-white p-2 relative">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-2 text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab
                  ? "text-white bg-black rounded-full"
                  : "text-black"
              }`}
            >
              {tab} 
              {activeTab === tab && (
                <img
                  src="/assets/icons/ActiveIcon.png"
                  alt="Active"
                  className="w-4 h-4 "
                />
              )}
            </button>
          ))}
          {/* Blue Underline */}
          <div
            className="absolute bottom-0 h-1 bg-blue-500 transition-all duration-300"
            style={{
              width: "33.33%",
              left: `${tabs.indexOf(activeTab) * 33.33}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Items */}
      <div className="mt-[3rem] space-y-2 p-2 pb-[4rem]">
        {activeTab === "ACTIVE" &&
          items.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate("/details/altcoinist")}
              className="p-2 shadow-lg border-b-2 border-gray-500 border-dotted"
            >
              {/* Icon and Content */}
              <div className="flex gap-2 items-center">
                {/* Icon */}
                <div className="flex gap-2 flex-shrink-0">
                  <img
                    src={item.icon}
                    alt={`${item.title} Icon`}
                    className="h-[10vh] w-[10vh] rounded-full"
                  />
                </div>

                {/* Content */}
                <div className="flex justify-between items-start w-full">
                  <div className="flex items-start flex-col">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-400 text-sm">{item.category}</p>
                  
                  </div>
                  
                  <div className="flex text-[12px] text-gray-400 flex-col items-end">
                    <span className="text-sm text-white px-2 py-1 border border-white">
                      {item.amount}
                    </span>
                    
                    <div className="flex flex-col items-end gap-0">
                      <span>Not Rated</span>
                      <span>{item.daysLeft}d left</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar Below */}
              <p className="text-sm">
                {item.progressAmount}
              </p>
              <div className="w-full mt-4">
                <ProgressBar height="6px" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};