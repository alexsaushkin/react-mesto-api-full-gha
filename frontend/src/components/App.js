import api from "../utils/Api";
import authApi from "../utils/Auth";
import avatar from "../images/avatar.jpg";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import React from "react";
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRouteElement from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoToolTip from "./InfoTooltip";

const JWT_KEY = 'jwt';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccessTooltipStatus, setIsSuccessTooltipStatus] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState('');

  const [authEmail, setAuthEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: avatar});

  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

  const [cards, setCards] = React.useState([]);

  const navigate = useNavigate();

  async function login({password, email}) {
    try {
      const data = await authApi.authorize(password, email);
      if (!data) {
        throw new Error('Ошибка аутентификации')
      }
      if (data.token) {
        localStorage.setItem(JWT_KEY, data.token);
        setLoggedIn(true);
        navigate("/", {replace: true})
      }
    } catch (e) {
      setInfoMessage('Не удалось войти в систему! Проверьте свои данные.');
      setIsSuccessTooltipStatus(false);
      setIsInfoTooltipOpen(true);
    } finally {
      setLoading(false);
    }
  }

  async function register({password, email}) {
    try {
      const data = await authApi.register(password, email);
      if (!data) {
        throw new Error('Ошибка аутентификации')
      } else {
        setIsSuccessTooltipStatus(true);
        setInfoMessage('Вы успешно зарегистрировались!');
        navigate("/sign-in", {replace: true});
      }
    } catch (e) {
      setInfoMessage('Что-то пошло не так! Попробуйте ещё раз.');
      setIsSuccessTooltipStatus(false);
    } finally {
      setLoading(false);
      setIsInfoTooltipOpen(true);
    }
  }

  async function checkToken() {
    try {
      const jwt = localStorage.getItem(JWT_KEY);
      console.log('jwt', jwt)
      if (!jwt) {
        throw new Error('no token');
      }
      const data = await authApi.getContent(jwt);
      if (!data) {
        throw new Error('no user');
      }
      setLoggedIn(true);
      setAuthEmail(data.data.email);
    } catch (e) {
      throw new Error(`Ошибка: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setLoggedIn(false);
    setAuthEmail('');
    localStorage.removeItem(JWT_KEY);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateUser(data) {
    api.editProfile(data)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAddPlace(data) {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const cardId = card._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    (isLiked ? api.dislikeCard(cardId) : api.likeCard(cardId))
      .then((newCard) => {
        setCards((state) => state.map((c) => {
          return c._id === cardId ? newCard: c
        }));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  function getData() {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([info, cardsData]) => {
        setCurrentUser(info);
        setCards(cardsData);
      })
      .catch(err => {
        console.log(err);
      })
  }

  React.useEffect(() => {
    try {
      checkToken()
        .then(() => {
            getData();
          }
        )
        .catch((e) => {
          console.log(e.message);
        })
    } catch (e) {
      console.log(e)
    }
  }, [loggedIn]);

  if (loading) {
    return 'Loading...';
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={authEmail} onSignOut={logout} />
      <Routes>
        <Route path="/" element={<ProtectedRouteElement
          loggedIn={loggedIn}
          element={Main}
          cards = {cards}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />} />
        <Route path="/sign-up" element={<Register onRegister={register} />} />
        <Route path="/sign-in" element={<Login onLogin={login} />} />
        <Route path="/*" element={<Navigate to="/" replace/>} />
      </Routes>
      {loggedIn && <Footer/>}

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

      <InfoToolTip
        isOk={isSuccessTooltipStatus}
        message={infoMessage}
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
