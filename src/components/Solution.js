import { useRef, useState, useEffect } from "react";

function Solution({value}) {
  const {name,descroption,blocks,blocksText,deadline,deadlineDesc,price,itemIsOpen} = value;
  const [isOpen, setOpen] = useState(itemIsOpen);
  const contentRef = useRef(null); 
	const topRef = useRef(null)


  const openContent = () => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`; // Полная высота
    }
  };

  const closeContent = () => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = `${topRef.current.scrollHeight+60}px`;  // Закрываем 
    }
  };

  useEffect(() => {    
    if (isOpen) {
      openContent();
    } else {
      closeContent();
    }
  }, [isOpen]);

  useEffect(()=>{
    setTimeout(() => {
      isOpen ? openContent() : contentRef.current.style.maxHeight = `${topRef.current.scrollHeight+60}px`;
    }, 100);
  })

	return (
			<div
			ref={contentRef}
			className="solutions__wrapper">
        <div className="inner__container">
          <div
          className="solutions__top">
            <p className="site__txt">Сайт</p>
            <div className="description__column">
              <h2
              onClick={()=>setOpen(!isOpen)}
              ref={topRef}
              >{name}</h2>
              <p>{descroption}</p>
            </div>
            <div className="solutions__button--open-modal">
              <span className="icon-arr"></span>
              Этапы разработки
              <br/>
              и порядок оплат
            </div>
          </div>
          <div className="solutions__middle">
            <div className="solutions__cards">
              <div className="solution__card">
                <h3 className="solution__card--heading">СТРУКТУРА</h3>
                <p className="solution__card--accent">{blocks}</p>
                <p className="solution__card--description">{blocksText}</p>
              </div>
              <div className="solution__card">
                <h3 className="solution__card--heading">СРОК</h3>
                <p className="solution__card--accent">{deadline}</p>
                <p className="solution__card--description">{deadlineDesc}</p>
              </div>
              <div className="solution__card">
                <h3 className="solution__card--heading">АДАПТИВНОСТЬ</h3>
                <p className="solution__card--accent">М+ </p>
                <p className="solution__card--description">Сайт отлично адаптирован под планшетные и мобильные устройства</p>
              </div>
              <div className="solution__card">
                <h3 className="solution__card--heading">ЗАГРУЗКА</h3>
                <p className="solution__card--accent">0,4</p>
                <p className="solution__card--description">Моментальная скорость загрузки сайта. В среднем, не более 0,4 сек.</p>
              </div>
            </div>
          </div>
          <div className="solutions__bottom">
            <div className="solutions__offer">
              <div className="solutions__offer--left">
                <p className="solutions__offer--heading">Получите коммерческое предложение</p>
                <p className="solutions__offer--text">Тариф {name}</p>
              </div>
              <div className="solutions__offer--right">
                <a href="http://a1w.ru/wp-content/uploads/2025/02/129794.jpg" 
                target="_blank" rel="noreferrer" 
                download className="icon-plus download-btn"> </a>
                <p>PDF 1 MB</p>
              </div>
            </div>
            <div className="solutions__price">
              <span>Стоимость от:</span>
              <p>{price}</p>
            </div>
          </div>

        </div>
			</div>
  )  
}

export default Solution