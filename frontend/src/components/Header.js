import React, {useState} from 'react';
import {NavLink, Route, Routes} from "react-router-dom";

export default function Header({email, onSignOut}) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }

  function handleSignOut() {
    setIsMobileMenuOpened(false);
    onSignOut();
  }

  return (
    <header className="header">
      <div className={`header__mobile-content ${isMobileMenuOpened ? "header__mobile-content_opened" : ""}`}>
        <p className='header__email'>{email}</p>
        <button className='header__exit-btn' onClick={handleSignOut}>Выйти</button>
      </div>
      <div className="header__content">
        <div className="header__logo"></div>
        <nav className="header__menu menu">
          <Routes>
            <Route path="/sign-up" element={<NavLink className='menu__item' to='/sign-in'>Войти</NavLink>}/>
            <Route path="/sign-in" element={<NavLink className='menu__item' to='/sign-up'>Регистрация</NavLink>}/>
            <Route path="/" element={
              <div className='menu__burger'>
                <div className='menu__toggle-container' onClick={toggleMobileMenu}>
                  <span className={`menu__toggle ${isMobileMenuOpened ? "menu__toggle_clicked" : ""}`}></span>
                </div>

                <div className='menu__content'>
                  <p className='menu__email'>{email}</p>
                  <button className='menu__exit-btn' onClick={handleSignOut}>Выйти</button>
                </div>
              </div>
            }/>
          </Routes>
        </nav>
      </div>
    </header>
  )
}
