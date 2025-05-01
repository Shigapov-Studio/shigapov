import { useEffect, useState } from 'react'
import '../assets/styles/CookieWarning.css'

function CookieWarning() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const cookieAccepted = document.cookie.includes('cookie_consent=true')
    if (!cookieAccepted) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    // Устанавливаем cookie сроком на 1 месяц
    const expiryDate = new Date()
    expiryDate.setMonth(expiryDate.getMonth() + 1)
    document.cookie = `cookie_consent=true; expires=${expiryDate.toUTCString()}; path=/`
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie__wrapper">
      <p className='cookie__text'>
        Мы используем файлы cookie <br /> и аналогичные технологии
      </p>
      <button className="cookie__button" onClick={handleAccept}>
        Хорошо
      </button>
    </div>
  )
}

export default CookieWarning
