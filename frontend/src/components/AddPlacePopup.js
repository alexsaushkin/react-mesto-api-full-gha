import React, {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    })
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title='Новое место'
      name='card'
      buttonText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input">
        <input
          id="title-input"
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          className="popup__text popup__text_type_title"
        />
        <span className="popup__error title-input-error"></span>
      </div>
      <div className="popup__input">
        <input
          id="image-input"
          type="url"
          name="link"
          value={link}
          onChange={handleLinkChange}
          placeholder="Ссылка на картинку"
          required
          className="popup__text popup__text_type_image-link"
        />
        <span className="popup__error image-input-error"></span>
      </div>
    </PopupWithForm>
  )
}
