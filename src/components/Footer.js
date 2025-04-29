import { Link } from "react-router";
import { useModalStore } from "../store/modalStore";
import FormModal from "./FormModal";

function Footer() {
  const currentYear = new Date().getFullYear();
  const openModal = useModalStore((state) => state.openModal)

  const handleClick = () => {
    openModal(<FormModal/>)
  }
  return (
    <footer>
      <div className="lcontainer">
        <div className="footer__top">
          <div className="footer__top--left">
            <a className="footer__mail" href="mailto:info@shigapov.studio">info@shigapov.studio</a>
            <a className="footer__phone" href="tel:89118428490">8 911 842-84-90</a>
            <p className="footer__adress">
              <span>Санкт-Петербург</span><br/>
              196105, улица Решетникова дом 15, офис 200-21 А 
            </p>
            <p className="footer__working--hours">
              <span>Режим работы</span><br/>
              По будням с 10.00 до 18.00
            </p>
            <p className="footer__bitrix">
              <span>24</span> 
              <a href="https://www.bitrix24.ru/partners/partner/10791528/" rel="noreferrer" target="_blank">Партнер Битрикс24</a>
            </p>
          </div>
          <div className="footer__top--right">
            <div className="footer__right--top">
              <ul>
                <li><span className="icon-Telegram"></span> Telegram</li>
                <li><span className="icon-vk"></span> Вконтакте</li>
                <li><span className="icon-Whatsapp"></span> Whatsapp</li>
              </ul>
              <div onClick={handleClick}  className="footer__discuss">Обсудить <br/> проект <span className="icon-plus"></span>
              <div className="rainbow">
                <div className="rainbow__orange"></div>
                <div className="rainbow__red"></div>
                <div className="rainbow__purple"></div>
              </div>

              </div>
            </div>
            <div className="footer__right--middle">
              <ul>
                <li><span className="icon-yandex"></span><a href="/">Яндекс</a></li>
                <li><span>Ru</span> <a href="https://www.rusprofile.ru/ip/318784700266370">Rusprofile</a> </li>
                <li><span className="icon-dzen"></span> <a href="/">Dzen</a> </li>
                <li><span>PDF</span> <a href="http://a1w.ru/wp-content/uploads/2025/02/129794.jpg" rel="noreferrer" target="_blank" download="129794.jpg">Презентация</a></li>
              </ul>
            </div>
            <div className="footer__right--bottom">
              <Link to="/policy">Политика конфиденциальности</Link>
              <p>{currentYear} Shigapov Studio</p>
              <p>Разработка и продвижение сайтов</p>
            </div>
          </div>
        </div>
        <div className="footer__logo"> 
          <span>S</span>
          <span>h</span>
          <span>i</span>
          <span>g</span>
          <span>a</span>
          <span>p</span>
          <span>o</span>
          <span>v</span>
        </div>
      </div>  
    </footer>
  )
}

export default Footer