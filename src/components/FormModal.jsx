import Form from './Form';

function FormModal() {

  return (
    <div className="form-modal">
      <div className="lcontainer">
        <div className="form__wrapper">
          <div className="form-modal__left">
            <h2>Расскажите о<br/> своем проекте</h2>
            <p>Коротко опишите свою задачу и мы свяжемся<br/> с вами в ближайшее время</p>
            <span>Надежно.<br/> Качественно.<br/> В срок.</span>
          </div>
          <div className="form-modal__right">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormModal;
