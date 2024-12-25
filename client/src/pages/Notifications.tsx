import React from "react";

// Define an Item interface for notifications
interface Item {
  id: number;
  icon: string; // Path to the icon
  title: string;
  content: string;
  borderColor: string; // Tailwind border color classes
}

export const Notifications: React.FC = () => {
  const items: Item[] = [
    {
      id: 1,
      icon: "/assets/icons/yellow.svg", // Replace with your actual path
      title: "New ICO launches",
      content: "New ICO Launch Alert: Explore the latest opportunity in the crypto world today!",
      borderColor: "border-yellow-500",
    },
    {
      id: 2,
      icon: "/assets/icons/blue.svg",
      title: "Updates on user ICOs",
      content: "Update Alert: Check out the latest progress on your ICOs now!",
      borderColor: "border-blue-500",
    },
    {
      id: 3,
      icon: "/assets/icons/red.svg",
      title: "General alerts and system msg",
      content: "Alert: Stay updated with the latest system messages and notifications!",
      borderColor: "border-red-500",
    },
    {
      id: 4,
      icon: "/assets/icons/blue.svg",
      title: "Updates on user ICOs",
      content: "Update Alert: Check out the latest progress on your ICOs now!",
      borderColor: "border-blue-500",
    },
    {
      id: 5,
      icon: "/assets/icons/yellow.svg",
      title: "New ICO launches",
      content: "New ICO Launch Alert: Explore the latest opportunity in the crypto world today!",
      borderColor: "border-yellow-500",
    },
  ];

  return (
    <div className="bg-black text-white h-screen overflow-scroll pb-[10rem]">
      {/* Header */}
      <div className="fixed top-[4rem] flex justify-center w-full h-16 z-10">
        <div className="flex items-center bg-white p-2 gap-2 w-full shadow-md ">
          <img
            src="/assets/icons/Ring.svg"
            alt="Ring Icon"
            className="h-6 w-6 ml-2"
          />
          <p className="text-black font-extrabold text-xl">NOTIFICATIONS</p>
        </div>
      </div>

      {/* Notification Cards */}
      <div className="mt-[3rem] p-4 space-y-2 pb-[4rem]">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center bg-white p-2 rounded-tr-lg rounded-br-lg border-l-8 ${item.borderColor} shadow-md`}
          >
            {/* Icon */}
            <img src={item.icon} alt="Notification Icon" className="h-18 w-18" />
            {/* Content */}
            <div className="ml-4">
              <h2 className="font-extrabold text-lg text-black">{item.title}</h2>
              <p className="text-gray-600 text-sm">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};