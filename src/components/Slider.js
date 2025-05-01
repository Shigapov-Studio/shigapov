import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import SliderButton from './SliderButton';
import Counter from './Counter';
import { motion } from "motion/react";

function Slide1() {
  const isVisible = window.innerWidth > 1025;

  return (
    <div className="slide__content inner__container">
      <div className="slide__left">
        <h1 className="slide__heading"> 
          <motion.span
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          >Разработка</motion.span>
          <br /> 
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
          >сайтов </motion.span>
                    <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
          >под </motion.span>
                    <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }}
          > ключ</motion.span>
        </h1>
        <motion.p className="slide__left--text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
        
        >
          Недорогие полнофункциональные решения<br /> для малого бизнеса и ИП
        </motion.p>
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3, ease: "easeOut" }}
        style={{display: 'flex'}}
        >
          <SliderButton />
        </motion.div>
      </div>
      {isVisible && (
        <div className="slide__right">
          <div className="slide__right--inner">
            <p className="slide__right--text">Проектов реализовано</p>
            <Counter />
          </div>
        </div>
      )}
    </div>
  );
}

function Slide2() {
  return (
    <div className="slide__content inner__container">
      <div className="slide__left">
        <h1 className="slide__heading">Разработка<br /> сайтов под ключ</h1>
        <p className="slide__left--text">
          Недорогие полнофункциональные решения<br /> для малого бизнеса и ИП
        </p>
        <SliderButton />
      </div>
    </div>
  );
}

function Slide3() {
  return (
    <div className="slide__content inner__container">
      <div className="slide__left">
        <h1 className="slide__heading">Разработка<br /> сайтов под ключ</h1>
        <p className="slide__left--text">
          Недорогие полнофункциональные решения<br /> для малого бизнеса и ИП
        </p>
        <SliderButton />
      </div>
    </div>
  );
}

function Slide4() {
  return (
    <div className="slide__content inner__container">
      <div className="slide__left">
        <h1 className="slide__heading">Разработка<br /> сайтов под ключ</h1>
        <p className="slide__left--text">
          Недорогие полнофункциональные решения<br /> для малого бизнеса и ИП
        </p>
        <SliderButton />
      </div>
    </div>
  );
}

const slides = [<Slide1 />, <Slide2 />, <Slide3 />, <Slide4 />];

const slideTexts = [
  <>
    <h2 className="slide__pagination--heading">Сайты</h2>
    <p className="slide__pagination--description">
      Разработка корпоративных сайтов и лендингов, с уникальным дизайном
    </p>
  </>,
  <>
    <h2 className="slide__pagination--heading">E-Commerce</h2>
    <p className="slide__pagination--description">
      Разработка интернет-магазинов с возможностью онлайн оплаты и доставкой
    </p>
  </>,
  <>
    <h2 className="slide__pagination--heading">Маркетинг</h2>
    <p className="slide__pagination--description">
      От SEO продвижения до контекстной рекламы и SMM. Приводим целевой трафик
    </p>
  </>,
  <>
    <h2 className="slide__pagination--heading">Bitrix24</h2>
    <p className="slide__pagination--description">
      Систематизируем Ваш бизнес. Профессиональное внедрение Битрикс24
    </p>
  </>,
];

const Slider = ({ autoPlayInterval = 6000 }) => {
  const slidesWithClones = [slides[slides.length - 1], ...slides, slides[0]];
  const [currentIndex, setCurrentIndex] = useState(1);
  const [disableTransition, setDisableTransition] = useState(true);
  const sliderRef = useRef(null);
  const autoPlayTimer = useRef(null);
  const isHovered = useRef(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    if (!isHovered.current && document.visibilityState === "visible") {
      autoPlayTimer.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }
  }, [autoPlayInterval, nextSlide]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
      } else {
        resetAutoPlay();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    resetAutoPlay();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [resetAutoPlay]);

  useEffect(() => {
    setTimeout(() => setDisableTransition(false), 50);
  }, []);

  const handleTransitionEnd = () => {
    if (currentIndex === slidesWithClones.length - 1) {
      setDisableTransition(true);
      setCurrentIndex(1);
      setTimeout(() => setDisableTransition(false), 50);
    } else if (currentIndex === 0) {
      setDisableTransition(true);
      setCurrentIndex(slidesWithClones.length - 2);
      setTimeout(() => setDisableTransition(false), 50);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      nextSlide();
      resetAutoPlay();
    },
    onSwipedRight: () => {
      prevSlide();
      resetAutoPlay();
    },
    trackMouse: true,
  });

  const handleMouseEnter = () => {
    isHovered.current = true;
    if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    resetAutoPlay();
  };

  const handlePaginationClick = (index) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  const slideWidth = 100 / slidesWithClones.length;
  const translateX = -currentIndex * slideWidth;

  return (
    <div
      className="slider-container"
      ref={sliderRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...swipeHandlers}
      style={{ position: "relative", overflow: "hidden", width: "100%" }}
    >
      <div
        className="slider-track"
        style={{
          display: "flex",
          width: `${slidesWithClones.length * 100}%`,
          transform: `translateX(${translateX}%)`,
          transition: disableTransition ? "none" : "transform 0.3s ease",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slidesWithClones.map((slide, index) => (
          <div
            key={index}
            className="slide"
            style={{
              width: `${slideWidth}%`,
              flexShrink: 0,
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="buttons__container inner__container">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.1, ease: "easeOut" }}        
          className="prev-button slider__navigation--button icon-leftang"
          onClick={() => {
            prevSlide();
            resetAutoPlay();
          }}
        />
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.1, ease: "easeOut" }}        
          className="next-button slider__navigation--button icon-rightang"
          onClick={() => {
            nextSlide();
            resetAutoPlay();
          }}
        />
      </div>

      <div className="pagination__container inner__container">
        {slides.map((_, i) => {
          const isActive = (currentIndex - 1 + slides.length) % slides.length === i;
          return (
            <motion.div
              className={`pagination__wrapper ${isActive ? "" : "disabled__pagination--wrapper"}`}
              key={i}
              onClick={() => handlePaginationClick(i + 1)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1*i, duration: .3, ease: "easeOut" }}            
            >
              <div
                className="pagination-item"
                style={{
                  width: "100%",
                  height: "2px",
                  background: "#D6DEE7",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {isActive && (
                  <div
                    className="progress-bar"
                    style={{
                      height: "100%",
                      background: "#000",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      animation: `progress ${autoPlayInterval / 1000}s linear`,
                    }}
                  />
                )}
              </div>
              <div
                className={`pagination__text ${isActive ? "active__pagination" : "disabled__pagination"}`}
                style={{ marginTop: "5px", width: "100%" }}
              >
                {slideTexts[i] || `Slide ${i + 1}`}
              </div>
            </motion.div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Slider;