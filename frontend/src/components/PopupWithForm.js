export default function PopupWithForm({title, name, buttonText, children, isOpen, onClose, onSubmit}) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`} id={`${name}-popup`}>
      <div className="popup__container">
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form" name={`edit-${name}`} onSubmit={onSubmit}>
          {children}
          <button className="popup__submit-btn" type="submit">{buttonText}</button>
        </form>
        <button className="popup__close-btn" type="button" onClick={onClose}></button>
      </div>
    </section>
  )
}
