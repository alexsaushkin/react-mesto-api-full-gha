import React, {useContext, useEffect, useState} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    })
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
        title={'Редактировать профиль'}
        name={'profile'}
        buttonText={'Сохранить'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <div className="popup__input">
          <input
            id="name-input"
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
            className="popup__text popup__text_type_name"
          />
          <span className="popup__error name-input-error"></span>
        </div>
        <div className="popup__input">
          <input
            id="about-input"
            type="text"
            name="about"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
            className="popup__text popup__text_type_profession"
          />
          <span className="popup__error about-input-error"></span>
        </div>
      </PopupWithForm>
  )
}
