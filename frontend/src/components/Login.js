import React from 'react';
import AuthForm from "./AuthForm";

export default function Login({onLogin}) {
  function handleSubmit({email, password}) {
    onLogin({
      password,
      email
    })
  }

  return (
    <AuthForm
      title='Вход'
      name='login'
      buttonText='Войти'
      onSubmit={handleSubmit}
    >
    </AuthForm>
  )
}
