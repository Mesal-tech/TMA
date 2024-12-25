import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  start: bigint; // Start time in seconds (or ms, depending on input)
  end: bigint; // End time in seconds (or ms, depending on input)
  height?: string; // Optional height
  color?: string; // Optional color for the progress
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  start,
  end,
  height = "10px",
  color = "#4caf50",
}) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const calculateProgress = () => {
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      const totalDuration = Number(end) - Number(start);
      const elapsed = now - Number(start);

      if (now >= Number(end)) {
        setProgress(100); // If time has passed the end, set to 100%
      } else if (now <= Number(start)) {
        setProgress(0); // If time hasn't reached the start, set to 0%
      } else {
        setProgress((elapsed / totalDuration) * 100); // Calculate progress percentage
      }
    };

    calculateProgress(); // Initial calculation
    const interval = setInterval(calculateProgress, 1000); // Update progress every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [startTime, endTime]);

  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius: "8px",
        background: "#e0e0e0", // Background for unfilled portion
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: color, // Progress color
          transition: "width 0.5s ease", // Smooth transition
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;