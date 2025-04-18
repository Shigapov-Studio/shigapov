import { useEffect, useRef, useState } from "react"

function Counter() {
  const numberRef = useRef(null);
  const [height, setHeight] = useState(0);
  
  useEffect(() => {
    const handlerHeight = () => {
      if (numberRef.current) {
        const newHeight = numberRef.current.offsetHeight;
        if (newHeight !== height) {
          setHeight(newHeight); // Обновляем состояние только при изменении высоты
        }
      }
    };
  
    handlerHeight();
    window.addEventListener("resize", handlerHeight);
  
    return () => {
      window.removeEventListener("resize", handlerHeight);
    };
  }, [height]);
  return (
    // <span className="slide__counter">58</span>
    <div
    style={{
      height: `${height}px`
    }}
    className="counter__wrapper">
      <div className="first-number number">
        <span ref={numberRef} className="current-number">5</span>
        <span className="current-number">4</span>
        <span className="current-number">3</span>
        <span className="current-number">2</span>
        <span className="current-number">1</span>
        <span className="current-number">0</span>
      </div>
      <div className="second-number number">
        <span className="current-number">8</span>
        <span className="current-number">7</span>
        <span className="current-number">6</span>
        <span className="current-number">5</span>
        <span className="current-number">4</span>
        <span className="current-number">3</span>
        <span className="current-number">2</span>
        <span className="current-number">1</span>
        <span className="current-number">0</span>
      </div>
    </div>
  )
}

export default Counter