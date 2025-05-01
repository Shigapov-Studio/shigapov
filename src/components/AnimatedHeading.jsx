import React from "react";
import { motion } from "framer-motion";

function AnimatedHeading({ heading, img, headingClass }) {
  return (
    <div
    className={`${headingClass}__heading`}
    style={{
      display: "flex",
    }}
    >
      <motion.img 
        initial={{ opacity: 0, y: 50 }} // Начальное состояние: прозрачный и смещен вниз
        whileInView={{ opacity: 1, y: 0 }} // Конечное состояние: видимый и в исходной позиции
        transition={{ delay: 0, duration: 0.3, ease: "easeOut" }} // Задержка зависит от индекса
        viewport={{ once: true }} // Анимация срабатывает только один раз
      className={`${headingClass}__img`} src={img} alt="" />
      <motion.h2
        initial={{ opacity: 0, y: 50 }} // Начальное состояние: прозрачный и смещен вниз
        whileInView={{ opacity: 1, y: 0 }} // Конечное состояние: видимый и в исходной позиции
        transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }} // Задержка зависит от индекса
        viewport={{ once: true }} // Анимация срабатывает только один раз      
          className={`${headingClass}__text`}>{heading}
      </motion.h2>
    </div>
  );
}

export default AnimatedHeading;
