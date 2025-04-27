import React, { useState, useEffect, useRef } from 'react';

const LazyLoad = ({ children, placeholder = null, threshold = 0.1, once = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, once]);

  return (
    <div ref={elementRef}>
      {isVisible ? children : placeholder}
    </div>
  );
};

export default LazyLoad;