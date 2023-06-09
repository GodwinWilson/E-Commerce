import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "../data/slider-data"
//import { Link } from "react-router-dom";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideLength = sliderData.length;

  const autoScroll = true;
  let scrollNext;

  const nextSlide = () => {
    if (currentSlide < slideLength - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (currentSlide === slideLength - 1) {
      setCurrentSlide(0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else if (currentSlide === 0) {
      setCurrentSlide(slideLength - 1);
    }
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  function canScroll() {
    scrollNext = setInterval(nextSlide, 5000);
  }

  useEffect(() => {
    if (autoScroll) {
      canScroll();
    }
    return () => clearInterval(scrollNext);
  }, [currentSlide]);

  return (
    <div className="w-full h-[90vh] relative overflow-hidden bg-zinc-950">
      <AiOutlineArrowLeft
        className="border-2 border-amber-600 rounded-full w-10 h-10 text-amber-500 cursor-pointer bg-transparent absolute left-6 top-1/2 hover:bg-white hover:text-amber-500 focus:outline-none z-10 prev arrow"
        onClick={prevSlide}
      />

      <AiOutlineArrowRight
        className="border-2 border-amber-600 rounded-full w-10 h-10 text-amber-500 cursor-pointer bg-transparent absolute top-1/2 right-6 hover:bg-white hover:text-amber-500 focus:outline-none z-10 next arrow"
        onClick={nextSlide}
      />

      {sliderData.map((slide, index) => {
        return (
          <div
            className={`absolute top-0 left-0 w-full h-full opacity-0 slide ${
              index === currentSlide ? "current" : ""
            }`}
            key={index}
          >
            {index == currentSlide && (
              <>
                <img
                  src={slide.image}
                  alt=""
                  className="object-cover w-full h-full"
                />
                <div className="absolute text-center top-1/3 w-1/2 flex items-center flex-col justify-self-center sm:p-12 p-7 left-1/2 text-white content">
                  <p className="sm:text-4xl text-2xl font-semibold sm:font-bold">{slide.heading}</p>
                  <p className="text-sm sm:text-base">{slide.desc}</p>
                  <hr className="border-b border-white w-full mb-1" />

                  <a
                    href="#products"
                    className="bg-blue-500 h-10 sm:h-8 flex items-center px-1 rounded"
                  >
                    Shop Now
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
