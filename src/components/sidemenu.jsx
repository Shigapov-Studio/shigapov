import { useEffect, useState } from "react";
import useHeaderStore from "../store/useHeaderStore";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  {
    name: "Кейсы",
    link: "/posts",
    content: "Наши успешные проекты и кейсы"
  },
  {
    name: "Результаты",
    link: "/results",
    content: "Достигнутые результаты и показатели"
  },
  {
    name: "Услуги",
    link: "/services",
    content: "Полный спектр наших услуг"
  },
  {
    name: "О компании",
    link: "/about",
    content: "Информация о нашей компании"
  },
  {
    name: "Блог",
    link: "/blog",
    content: "Последние статьи и новости"
  },
  {
    name: "Контакты",
    link: "/contacts",
    content: "Как с нами связаться"
  }
];

function Sidemenu({ toggleSide, sideIsOpen }) {
  const headerHeight = useHeaderStore((state) => state.headerHeight);
  const [activeContent, setActiveContent] = useState(null);

  useEffect(() => {
    document.body.style.overflow = sideIsOpen ? 'hidden' : 'visible';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [sideIsOpen]);

  return (
    <AnimatePresence>
      {sideIsOpen && (
        <motion.div
          className="side-menu"
          initial={{ top: "-100vh" }}
          animate={{ top: "0" }}
          exit={{ top: "-100vh" }}
          transition={{ duration: 0.2, type: "tween", ease: "linear" }}
          style={{
            paddingTop: headerHeight,
          }}
        >
          <nav className="side-menu__nav">
            <ul className="side-menu__menu">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  className="side-menu__menu-item"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: sideIsOpen? 1 : 0, y: 0 }}
                  transition={{
                    delay: 0.4 + index * 0.1,
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                  onMouseEnter={() => setActiveContent(item)}
                >
                  <p>{item.name}</p>
                </motion.li>
              ))}
            </ul>
          </nav>
          
          <motion.div 
            className="side-menu__content-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: activeContent ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeContent && (
              <motion.a
                href={activeContent.link}
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                exit={{ y: 10 }}
              >
                {activeContent.content}
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidemenu;