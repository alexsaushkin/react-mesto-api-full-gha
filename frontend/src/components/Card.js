import React, {useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `gallery__like ${isLiked && 'gallery__like_active'}`
  );

  function handleClick() {
    const name = card.name;
    const link = card.link;
    onCardClick({name, link});
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className="gallery__element">
      <img className="gallery__photo"
           src={card.link}
           alt={card.name}
           onClick={handleClick}
      />
      {isOwn && <button className="gallery__delete gallery__delete_active" type="button" onClick={handleDeleteClick}></button>}
      <div className="gallery__info">
        <h2 className="gallery__title">{card.name}</h2>
        <div className="gallery__like-block">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="gallery__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}
