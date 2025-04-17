import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

function Header({ headerHeight, setHeight }) {
  const headerRef = useRef();

  // Устанавливаем высоту хедера
  useEffect(() => {
    if (headerRef.current) {
      setHeight(headerRef.current.offsetHeight);
    }
  }, [setHeight]);

  return (
    <div
      ref={headerRef}
      className="lcontainer"
      style={{
        background: '#fff0',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 5,
      }}
    >
      <header>
        <a href="/" className="header__logo">SHIGAPOV</a>
        <nav className="header__navigation">
          <Link to="/">Главная</Link>
          <Link to="/contacts">Контакты</Link>
          <a href="/#prices">Цены</a>
        </nav>
        <a className="header__phone" href="tel:+89118428490">8 911 842 84 90</a>
        <div className="hamburger__wrapper">
          <span className="topline"></span>
          <span className="bottomline"></span>
        </div>
      </header>
    </div>
  );
}

export default Header;