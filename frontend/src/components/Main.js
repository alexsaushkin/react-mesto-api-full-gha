import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import React, {useContext} from "react";

export default function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  const cardsElements = cards.map((cardData, i) => (
    <li key={cardData._id}>
      <Card
        card={cardData}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    </li>
  ));

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__person">
          <div className="profile__image-block">
            <img
              className="profile__image"
              src={currentUser.avatar}
              alt={currentUser.name}
              onClick={onEditAvatar}
            />
          </div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__name-value">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="gallery">
        <ul className="gallery__items">
          { cardsElements }
        </ul>
      </section>
    </main>
  )
}
