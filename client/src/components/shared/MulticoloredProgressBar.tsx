import React, { useEffect, useState } from "react";

interface MulticoloredProgressBarProps {
  startTime: bigint; // Start time in seconds (or ms, depending on input)
  endTime: bigint; // End time in seconds (or ms, depending on input)
  sections: { color: string; percentage: number }[]; // Array of color and percentage
  height?: string; // Optional height
  color?: string; // Optional color for the progress
}

const MulticoloredProgressBar: React.FC<MulticoloredProgressBarProps> = ({
  startTime,
  endTime,
  sections,
  height = "10px",
  color = "#4caf50",
}) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const calculateProgress = () => {
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      const totalDuration = Number(endTime) - Number(startTime);
      const elapsed = now - Number(startTime);

      if (now >= Number(endTime)) {
        setProgress(100); // If time has passed the end, set to 100%
      } else if (now <= Number(startTime)) {
        setProgress(0); // If time hasn't reached the start, set to 0%
      } else {
        setProgress((elapsed / totalDuration) * 100); // Calculate progress percentage
      }
    };

    calculateProgress(); // Initial calculation
    const interval = setInterval(calculateProgress, 1000); // Update progress every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [startTime, endTime]);

  // Generate gradient stops with overlaps for smooth blending
  const gradientStops = sections
    .map((section, index) => {
      const offsetStart = sections
        .slice(0, index)
        .reduce((acc, curr) => acc + curr.percentage, 0);
      const offsetEnd = offsetStart + section.percentage;

      return `${section.color} ${offsetStart * 1.2}%, ${section.color} ${offsetEnd}%`;
    })
    .join(", ");
  
  return (
    <div
      className="relative w-full rounded-[8px] bg-[#e0e0e0] overflow-hidden"
      style={{
        height,
      }}
    >
      <div className="absolute h-full w-full top-0 bg-transparent flex flex-col items-end left-0 z-[1]">
        <div className="h-full bg-[#e0e0e0]"
          style={{
          width: `${100 - progress}%`,
          transition: "width 0.5s ease", // Smooth transition
        }}
        ></div>
      </div>
      
      <div
        className="absolue top-0 left-0 z-[100]"
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(to right, ${gradientStops})`, // Progress color
          transition: "width 0.5s ease", // Smooth transition
        }}
      ></div>
    </div>
  );
};

export default MulticoloredProgressBar;