import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { navLinks } from "../../constants";
import { Link } from "../Link";

const Bottombar: React.FC = () => {
  const location = useLocation();
  const [dotPosition, setDotPosition] = useState<number>(0);
  const tabsRef = React.useRef<HTMLDivElement[]>([]);

  // Calculate dot position dynamically
  useEffect(() => {
    const activeIndex = navLinks.findIndex((link) => location.pathname === link.path);

    if (tabsRef.current[activeIndex]) {
      const activeTab = tabsRef.current[activeIndex].getBoundingClientRect();
      const container = document.querySelector(".bottombar-container")?.getBoundingClientRect();

      if (activeTab && container) {
        // Center the dot based on active tab
        setDotPosition(activeTab.left + activeTab.width / 2 - container.left);
      }
    }
  }, [location.pathname]);

  return (
    <div className="bottombar-container bg-white rounded-t-[15px] w-full h-[3.5rem] fixed bottom-0 z-[50] flex justify-between items-center gap-2 px-2 md:px-6">
      {/* Animated Dot Indicator */}
      <div
        className="absolute top-[-1.5rem] w-4 h-4 border-[3.3px] border-black bg-white rounded-full transition-all duration-300 ease-in-out z-50"
        style={{
          left: `${dotPosition}px`,
          transform: "translateX(-50%)",
          top: -10,
        }}
      ></div>

      {/* Navigation Tabs */}
      {navLinks.map((link, index) => (
        <div
          key={link.id}
          ref={(el) => (tabsRef.current[index] = el)} // Assign ref for each tab
          className={`relative w-12 h-12 rounded-[12px] flex flex-col overflow-visible justify-center items-center gap-[2px] ${
            location.pathname === link.path ? "bg-[#FFFFFF]" : ""
          }`}
        >
          <Link to={link.path}>
            <img
              src={`/assets/icons/${link.icon}.png`}
              alt={link.title}
              className={`object-contain ${
                link.title === "ICO" || link.title === "NFT" ? "min-w-20 min-h-20 mb-2" : "w-8 h-8"}
                ${link.title === "NFT" ? "mb-[2px]" : ""
              }`}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Bottombar;