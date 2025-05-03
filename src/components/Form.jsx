import { useState } from "react";
import { PatternFormat } from 'react-number-format';
import { SmartCaptcha } from '@yandex/smart-captcha';

function Form() {
  const [data, setData] = useState({
    task: '',
    file: null,
    duration: '',
    name: '',
    tel: '',
    company: '',
    email: '',
    conscent: false
  });

  const [captchaToken, setCaptchaToken] = useState('');
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const validationRules = {
    task: (value) => typeof value === 'string' && value.trim().length > 5,
    email: (value) => /^\S+@\S+\.\S+$/.test(value),
    tel: (value) => /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(value),
    conscent: (value) => value === true,
    file: (value) => value instanceof File || value === null,
    duration: (value) => value !== '',
    name: (value) => typeof value === 'string' && value.trim().length > 2,
    company: (value) => typeof value === 'string' && value.trim().length > 2,
  };

  const onChange = (e) => {
    const key = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setData((prevData) => {
      const newData = { ...prevData, [key]: value };
      validateField(key, value);
      return newData;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData((prevData) => ({ ...prevData, file }));
  };

  const validateField = (name, value) => {
    const isValid = validationRules[name](value);
    setErrors((prev) => ({
      ...prev,
      [name]: !isValid
    }));
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formIsValid = true;
    for (const key in data) {
      if (key === "file") continue;
      const isFieldValid = validateField(key, data[key]);
      if (!isFieldValid) {
        formIsValid = false;
      }
    }

    if (!formIsValid) {
      console.log('Форма заполнена с ошибками');
      return;
    }

    if (!captchaToken) {
      alert("Пожалуйста, пройдите проверку капчей.");
      return;
    }

    const formData = new FormData();
    formData.append('task', data.task);
    formData.append('file', data.file);
    formData.append('duration', data.duration);
    formData.append('name', data.name);
    formData.append('tel', data.tel);
    formData.append('company', data.company);
    formData.append('email', data.email);
    formData.append('conscent', data.conscent ? 'yes' : 'no');
    formData.append('smart-token', captchaToken);

    setSending(true);

    try {
      const response = await fetch('/sendmail.php', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setSuccess(true);
        setData({
          task: '',
          file: null,
          duration: '',
          name: '',
          tel: '',
          company: '',
          email: '',
          conscent: false
        });
        setErrors({});
        setCaptchaToken('');
      } else {
        console.error('Ошибка при отправке формы');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form" noValidate>
      <div className="form__input-wrapper what-to-do__wrapper">
        <textarea
          name="task"
          value={data.task}
          placeholder="Напишите, что надо сделать"
          className={`form__text-input what-to-do ${errors.task ? 'incorrect' : data.task ? 'correct' : ''}`}
          onChange={onChange}
          rows={4}
        />
        <span className="checkmark">✓</span>
      </div>

      <div className="form__file-container">
        <p className="form__file-descr">Расскажите о своем проекте. Какой сайт хотите создать или доработать. Если есть ТЗ - отлично! Прикрепите его к заявке.</p>
        <div className={`form__file-wrapper ${data.file ? 'form__file-wrapper--active' : ''}`}>
          <label className="form__file-label" htmlFor="form__file">{data.file ? data.file.name : 'Прикрепить файл'}</label>
          <div className="form__file-button"
            onClick={() => setData(prev => ({ ...prev, file: null }))}>
            <span className="form__file-button-topline"></span>
            <span className={`form__file-button-bottomline ${data.file ? 'active__filebutton' : ''}`}></span>
          </div>
          <input
            onChange={handleFileChange}
            type="file"
            name="file"
            id="form__file"
            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/*"
          />
        </div>
      </div>

      <div className="form__duration-wrapper">
        <p className={`form__duration-descr ${errors.duration ? 'incorrect' : data.duration ? 'correct' : ''}`}>Какие сроки?</p>
        {["2 недели", "Месяц", "Время есть"].map(option => (
          <label key={option}>
            {option}
            <input
              type="radio"
              name="duration"
              value={option}
              checked={data.duration === option}
              onChange={onChange}
              className={`form__radio-duration ${errors.duration ? 'incorrect' : data.duration ? 'correct' : ''}`}
            />
          </label>
        ))}
      </div>

      <div className="form__input-group">
        <div className="form__input-wrapper">
          <input
            type="text"
            name="name"
            value={data.name}
            placeholder="Имя"
            className={`form__text-input ${errors.name ? 'incorrect' : data.name ? 'correct' : ''}`}
            onChange={onChange}
          />
          <span className="checkmark">✓</span>
        </div>

        <div className="form__input-wrapper">
          <PatternFormat
            className={`form__text-input ${errors.tel ? 'incorrect' : data.tel ? 'correct' : ''}`}
            type="tel"
            name="tel"
            value={data.tel}
            onChange={onChange}
            format="+7 (###) ###-##-##"
            allowEmptyFormatting
            mask="_"
            required
          />
          <span className="checkmark">✓</span>
        </div>

        <div className="form__input-wrapper">
          <input
            type="text"
            name="company"
            value={data.company}
            placeholder="Компания"
            className={`form__text-input ${errors.company ? 'incorrect' : data.company ? 'correct' : ''}`}
            onChange={onChange}
          />
          <span className="checkmark">✓</span>
        </div>

        <div className="form__input-wrapper">
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Email"
            className={`form__text-input ${errors.email ? 'incorrect' : data.email ? 'correct' : ''}`}
            onChange={onChange}
          />
          <span className="checkmark">✓</span>
        </div>
      </div>

      <div className="form__conscent-wrapper">
        <label className={`form__conscent-label ${errors.conscent ? 'incorrect' : data.conscent ? 'correct' : ''}`}>
          <div className={`form__conscent-box ${data.conscent && 'conscent'}`}>{data.conscent && '✓'}</div>
          <input
            type="checkbox"
            name="conscent"
            checked={data.conscent}
            className={`form__conscent-input ${errors.conscent ? 'incorrect' : data.conscent ? 'correct' : ''}`}
            onChange={onChange}
          />
          Нажимая кнопку «Отправить», я даю свое согласие на обработку моих персональных данных
        </label>
      </div>

      <div className="form__captcha-wrapper">
        <SmartCaptcha sitekey="ysc1_JnVqIkL5y36sYVVkBQVR13ZZPTgOnVdzJCBjYSWV570465c9" onSuccess={setCaptchaToken} />
      </div>

      <div className="form__submit-wrapper">
        <input type="submit" value={sending ? 'Отправляется...' : 'Отправить'} />
      </div>

      {success && <span className="form__success">Форма успешно отправлена</span>}
    </form>
  );
}

export default Form;
