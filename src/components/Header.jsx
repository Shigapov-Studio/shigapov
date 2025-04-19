import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useHeaderStore from "../store/useHeaderStore";
import { motion } from "framer-motion";
import _ from 'lodash';

function Header() {
  const headerRef = useRef();
  const setHeaderHeight = useHeaderStore((state) => state.setHeaderHeight);
  const [isVisible, setVisible] = useState(true);

  useEffect(()=>{
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      setHeaderHeight(height);
    }
  }, [setHeaderHeight]);

  useEffect(() => {
    let prevScrollY = 0;

    const scrollHandler = _.throttle(() => {

      if (window.scrollY > prevScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      prevScrollY = window.scrollY;
    }, 100); // Ограничение: 1 вызов каждые 100 мс

    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <motion.div
      ref={headerRef}
      className="lcontainer"
      style={{
        background: '#fff0',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 5,
        transition: '.2s',
        transform: `translateY(${isVisible? 0 : -headerRef.current.offsetHeight}px)`,
      }}
    >
      <header>
        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
        href="/" className="header__logo">SHIGAPOV</motion.a>
        <nav className="header__navigation">
          <ul className="header__navigation-list">
            <motion.li
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
            ><a href="">Кейсы</a></motion.li>
            <motion.li
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
            ><a href="">Решения</a></motion.li>
            <motion.li
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.3, ease: "easeOut" }}           
            ><a href="">Отзывы</a></motion.li>
            <motion.li
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }}            
            ><a href="">О компании</a></motion.li>
            <motion.li
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.3, ease: "easeOut" }}            
            ><Link to="/contacts">Контакты</Link></motion.li>
          </ul>
        </nav>
        <motion.a 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}                    
        className="header__phone" href="tel:+89118428490">8 911 842 84 90</motion.a>
        <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}                    
        className="hamburger__wrapper">
          <span className="topline"></span>
          <span className="bottomline"></span>
        </motion.div>
      </header>
    </motion.div>
  );
}

export default Header;