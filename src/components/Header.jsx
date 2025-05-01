import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useHeaderStore from "../store/useHeaderStore";
import { motion } from "framer-motion";
import _ from 'lodash';
import Sidemenu from "./sidemenu";
import FormModal from "./FormModal";
import { useModalStore } from "../store/modalStore";



function Header() {
  const headerRef = useRef();
  const setHeaderHeight = useHeaderStore((state) => state.setHeaderHeight);
  const [isVisible, setVisible] = useState(true);
  const [sideIsOpen, setSideOpen] = useState(false);
  const openModal = useModalStore((state) => state.openModal)

  const handleClick = () => {
    openModal(<FormModal/>)
  }


  function toggleSide() {
    setSideOpen(prev=>!prev);
  }

  useEffect(()=>{
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      setHeaderHeight(height);
    }
  }, [setHeaderHeight]);

  useEffect(() => {
    let prevScrollY = window.scrollY;
    let scrollDelta = 0;
  
    const scrollHandler = _.throttle(() => {
      const currentScrollY = window.scrollY;
  
      // Если пользователь в самом верху — всегда показываем хедер
      if (currentScrollY === 0) {
        setVisible(true);
        scrollDelta = 0;
        prevScrollY = 0;
        return;
      }
  
      const diff = currentScrollY - prevScrollY;
      scrollDelta += diff;
  
      if (diff > 0 && scrollDelta > 150) {
        setVisible(false); // Скроллим вниз более чем на 150px
        scrollDelta = 0;
      } else if (diff < 0 && scrollDelta < -150) {
        setVisible(true); // Скроллим вверх более чем на 150px
        scrollDelta = 0;
      }
  
      prevScrollY = currentScrollY;
    }, 100);
  
    window.addEventListener('scroll', scrollHandler);
  
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <motion.div
      ref={headerRef}
      className="lcontainer"
      style={{
        // backgroundColor: '#fff0',
        position: 'fixed',
        top: 0,
        left: 0,
        backdropFilter: window.innerWidth < 770 ? 'blur(4px)' : '',
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
            ><Link to="/posts">Кейсы</Link></motion.li>
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
        <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}   
        onClick={handleClick}                 
        className="header__contact">Обсудить проект</motion.div>
        <motion.div
        onClick={toggleSide} 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}                    
        className="hamburger__wrapper">
          <span className={`topline ${ sideIsOpen&& 'activespan'}`}></span>
          <span className={`topline ${ sideIsOpen&& 'activespan'}`}></span>
        </motion.div>
        <Sidemenu toggleSide={toggleSide} sideIsOpen={sideIsOpen}/>
      </header>
    </motion.div>
  );
}

export default Header;