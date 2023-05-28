export default function InfoToolTip({isOk, message, isOpen, onClose}) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`} id={`tooltip-popup`}>
      <div className="popup__container">
          <div className={`popup__info-image ${isOk ? 'popup__info-image_ok': ''}`}></div>
          <h3 className="popup__info-text">{message}</h3>
        <button className="popup__close-btn" type="button" onClick={onClose}></button>
      </div>
    </section>
  )
}
