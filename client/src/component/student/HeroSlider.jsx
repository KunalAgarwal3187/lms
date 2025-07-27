import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../../assets/assets";

const slides = [
  {
    title: "Skills That Drive You Forward",
    subtitle:
      "Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive.",
    image: assets.udify,
  },
  {
    title: "Land Your Dream Job with Confidence",
    subtitle:
      "Master in-demand tools, crack technical interviews, and build real-world projects that recruiters love — all from the comfort of your home.",
    image: assets.trythis,
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
   <div className="w-full md:max-w-[1340px] h-[250px] sm:h-[320px] md:h-[400px] mx-auto overflow-hidden relative shadow-lg pt-0 pb-10">

      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[current].image})` }}
        >
          <div className="w-full h-full flex items-center justify-start px-5 sm:px-10">
              <div className="bg-white w-[70%] h-[180px] sm:w-[440px] sm:h-[200px] p-4 sm:p-5 rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-black">
                {slides[current].title}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base mt-4 font-medium">
                {slides[current].subtitle}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroSlider;
