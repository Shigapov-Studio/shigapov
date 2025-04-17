import React from "react";

function AnimatedHeading({ heading, img, headingClass }) {
  return (
    <div

    className={`${headingClass}__heading`}
    style={{
      display: "flex",
    }}
    >
      <img className={`${headingClass}__img`} src={img} alt="" />
      <h2
          className={`${headingClass}__text`}>{heading}
      </h2>
    </div>
  );
}

export default AnimatedHeading;
