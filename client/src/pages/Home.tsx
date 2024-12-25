import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useParams, useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { MulticoloredProgressBar } from "../components/shared";
import { usePresaleContract } from '../hooks/usePresaleContract';
import Neuton from "./Neuton";

export const Home: React.FC = () => {
  const { detailId } = useParams<{ detailId?: string }>();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const {
    contractData,
  } = usePresaleContract();
  
  const progressSections = [
    { color: "#FF4D4F", percentage: 25 }, // Red Section
    { color: "#FAAD14", percentage: 30 }, // Yellow Section
    { color: "#52C41A", percentage: 45 }, // Green Section
  ];

  // Mock start and end times
  const startTime = BigInt(Math.floor(Date.now() / 1000)); // Started 1 minute ago
  const endTime = BigInt(Math.floor(Date.now() / 1000) + 60); // Ends in 5 minutes
  
  return (
    <AnimatePresence mode="wait">
      {detailId ? (
        <Neuton onClose={() => setShowDetails(false)} />
      ) : (
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <div className="w-full p-[1rem] pt-2 flex flex-col gap-6">
            <div className="flex flex-col gap-4 w-full">
              <div className="w-fit bg-sky-500 p-[2px] rounded-[15px] flex justify-center items-center">
                <h1 className="text-[18px] bg-black font-semibold rounded-[15px] px-4">
                  Active
                </h1>
              </div>

              {/* Swiper Slider */}
              <Swiper
                // install Swiper modules
                modules={[Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                className="w-full text-black px-4 h-[11rem]"
              >
                <SwiperSlide
                  onClick={() => navigate("/details/altcoinist")}
                  className="w-20"
                >
                  <div className="relative p-4 py-0 w-full bg-[#333] border border-white/80 rounded-lg h-[6rem]">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-[2px] items-center">
                        <div className="rounded-full w-12 h-12 overflow-hidden flex justify-center items-center">
                          <img
                            src="/assets/images/altcoin.png"
                            alt="Altcoin"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <h2 className="font-bold text-white text-[1.2rem]">ALTCOINIST</h2>
                      </div>

                      <div className="flex gap-0 items-center">
                        <h2 className="font-bold text-white text-[2.8rem]">12</h2>
                        <div className="flex flex-col gap-0">
                          <p className="bg-green-500 font-bold text-[12px] p-0">DAYS</p>
                          <p className="bg-white font-semibold text-[12px] p-0">LEFT</p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-[-55%] left-0 w-full px-2">
                      <div className="p-4 py-2 w-full bg-white border border-white/80 rounded-lg h-[5.5rem] flex flex-col justify-between gap-2">
                        <div className="flex gap-2 items-center">
                          <div className="w-8 h-8 flex justify-center items-center overflow-hidden">
                            <img
                              src="/assets/icons/si.png"
                              alt="SI"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="leading-[101%]">
                            <p className="font-semibold text-[10px]">Token Price</p>
                            <p className="font-bold text-[18px]">
                              0.009122 USDT
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-[2px]">
                          <MulticoloredProgressBar sections={progressSections} height="6px" startTime={startTime} endTime={endTime} />

                          <div className="w-full flex justify-between items-start">
                            <div>
                              <div>
                                <div className="flex itmes-center gap-[2px]">
                                  <img
                                    src="/assets/icons/calendar.svg"
                                    alt="Calendar"
                                    className="w-[12px] h-[12px]"
                                  />
                                  <p className="text-[9px] font-bold">10/11/2024</p>
                                </div>

                                <div className="flex itmes-center gap-[2px]">
                                  <img
                                    src="/assets/icons/clock.svg"
                                    alt="Clock"
                                    className="w-[12px] h-[12px]"
                                  />
                                  <p className="text-[9px] font-bold">10:30</p>
                                </div>
                              </div>

                            </div>

                            <div>
                              <div className="flex itmes-center gap-[2px]">
                                <img
                                  src="/assets/icons/timer.svg"
                                  alt="Timer"
                                  className="w-[12px] h-[12px]"
                                />
                                <p className="text-[9px] font-bold">11d 02h 20m 45s LEFT</p>
                              </div>

                            </div>

                            <div>
                              <div>
                                <div className="flex itmes-center gap-[2px]">
                                  <img
                                    src="/assets/icons/calendar.svg"
                                    alt="Calendar"
                                    className="w-[12px] h-[12px]"
                                  />
                                  <p className="text-[9px] font-bold">30/11/2024</p>
                                </div>


                                <div className="flex itmes-center gap-[2px]">
                                  <img
                                    src="/assets/icons/clock.svg"
                                    alt="Clock"
                                    className="w-[12px] h-[12px]"
                                  />
                                  <p className="text-[9px] font-bold">10:30</p>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide 
                  onClick={() => navigate("/details/altcoinist")}
                  className="w-20"
                >
                  <div className="relative p-4 py-0 w-full bg-[#333] border border-white/80 rounded-lg h-[6rem]">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-[2px] items-center">
                        <div className="rounded-full w-12 h-12 overflow-hidden flex justify-center items-center">
                          <img
                            src="/assets/images/Gpt360Image.png"
                            alt="Altcoin"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <h2 className="font-bold text-white text-[1.2rem]">GPT360</h2>
                      </div>

                      <div className="flex gap-0 items-center">
                        <h2 className="font-bold text-white text-[2.8rem]">12</h2>
                        <div className="flex flex-col gap-0">
                          <p className="bg-green-500 font-bold text-[12px] p-0">DAYS</p>
                          <p className="bg-white font-semibold text-[12px] p-0">LEFT</p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-[-55%] left-0 w-full px-2">
                      <div className="p-4 py-2 w-full bg-white border border-white/80 rounded-lg h-[5.5rem] flex flex-col justify-between gap-2">
                        <div className="flex gap-2 items-center">
                          <div className="w-8 h-8 flex justify-center items-center overflow-hidden">
                            <img
                              src="/assets/icons/si.png"
                              alt="SI"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="leading-[101%]">
                            <p className="font-semibold text-[10px]">Token Price</p>
                            <p className="font-bold text-[18px]">
                              0.009122 USDT
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-[2px]">
                          <MulticoloredProgressBar sections={progressSections} height="6px" />

                          <div className="w-full flex justify-between items-start">
                            <div>
                              <div>
                                <div className="flex itmes-center gap-[2px]">
                                  <img
                                    src="/assets/icons/calendar.svg"
                                    alt="Calendar"
                                    className="w-[12px] h-[12px]"
                                  />
                                  <p className="text-[9px] font-bold">10/11/2024</p>
                                </div>

                                <div className="flex itmes-center gap-[2px]">
                                  <img
                                    src="/assets/icons/clock.svg"
                                    alt="Clock"
                                    className="w-[12px] h-[12px]"
                                  />
                                  <p className="text-[9px] font-bold">10:30</p>
                                </div>
                              </div>

                            </div>

                            <div>
                              <div className="flex itmes-center gap-[2px]">
                                <img
                                  src="/assets/icons/timer.svg"
                                  alt="Timer"
                                  className="w-[12px] h-[12px]"
                                />
                                <p className="text-[9px] font-bold">11d 02h 20m 45s LEFT</p>
                              </div>

                            </div>

                            <div>
                              <div>
                                <div className="flex itmes-center gap-[2px]">
                                  <img
                                    src="/assets/icons/calendar.svg"
                                    alt="Calendar"
                                    className="w-[12px] h-[12px]"
                                  />
                                  <p className="text-[9px] font-bold">30/11/2024</p>
                                </div>


                                <div className="flex itmes-center gap-[2px]">
                                  <img
                                    src="/assets/icons/clock.svg"
                                    alt="Clock"
                                    className="w-[12px] h-[12px]"
                                  />
                                  <p className="text-[9px] font-bold">10:30</p>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                ...
              </Swiper>
            </div>

            <div className="flex gap-8 justify-around w-full px-4">
              <div className="relative w-full aspect-square bg-black rounded-lg shadow-blue-glow drop-shadow-[0_4px_10px_rgba(0,72,255,0.5)]/20 border border-blue-500/20">
                <div className="w-full h-full p-6">
                  <img 
                    src="/assets/images/item2.png" 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute bottom-[-10%] w-full px-4 flex justify-center items-center">
                  <p className="bg-black border-2 border-white/80 text-white/80 px-4 py-2 font-bold text-center w-full">
                    NFT
                  </p>
                </div>
              </div>

              <div className="relative w-full aspect-square bg-black rounded-lg shadow-blue-glow drop-shadow-[0_4px_10px_rgba(0,72,255,0.5)]/20 border border-blue-500/20">
                <div className="w-full h-full p-6">
                  <img 
                    src="/assets/images/item1.png" 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute bottom-[-10%] w-full px-4 flex justify-center items-center">
                  <p className="bg-black border-2 border-white/80 text-white/80 px-4 py-2 font-bold text-center w-full">
                    STAKE
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 w-full px-4 text-center">
              <p>Apply to organise an ICO by ensuring compliance with legal and regulatory requirements.</p>

              <p className="font-bold">Apply to organise ICO</p>

              <button className="w-fit bg-white px-[2px] rounded-[15px] flex justify-center items-center">
                <div className="flex gap-2 items-center text-[18px] border-2 border-black bg-white text-black font-semibold rounded-[15px] p-[3px] px-4">
                  APPLY NOW 

                  <div className="w-6 h-6 bg-black rounded-full">
                    <img 
                      src="/assets/icons/double-right-chevron.svg"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};