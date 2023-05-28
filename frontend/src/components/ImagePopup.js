import React from "react";

export default function ImagePopup({card, onClose}) {
  return (
    <section className={`popup popup_dark ${card.link !== '' ? 'popup_opened' : ''}`} id="photo-popup">
      <figure className="popup__image-block">
        <img className="popup__image" src={card.link} alt={card.name}/>
        <figcaption className="popup__caption">{card.name}</figcaption>
        <button className="popup__close-btn" type="button" onClick={onClose}></button>
      </figure>
    </section>
  )
}
