import React, {useContext, useEffect, useRef} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const currentUser = useContext(CurrentUserContext);

  const imageRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: imageRef.current.value,
    })
  }

  useEffect(() => {
    imageRef.current.value = currentUser.avatar;
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'avatar'}
      buttonText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input">
        <input
          ref={imageRef}
          id="avatar-input"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
          type="url"
          className="popup__text popup__text_type_image-link"
        />
        <span className="popup__error avatar-input-error"></span>
      </div>
    </PopupWithForm>
  )
}
