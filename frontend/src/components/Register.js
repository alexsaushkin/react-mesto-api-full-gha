import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from "./AuthForm";

export default function Register({onRegister}) {
  function handleSubmit({email, password}) {
    onRegister({
      password,
      email
    })
  }

  return (
    <AuthForm
      title='Регистрация'
      name='register'
      buttonText='Зарегистрироваться'
      onSubmit={handleSubmit}
    >
      <p className="auth__question">Уже зарегистрированы? <Link to="/sign-in" className="auth__login-link">Войти</Link></p>
    </AuthForm>
  )
}
