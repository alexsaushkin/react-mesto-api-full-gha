import React, {useState} from 'react';

export default function AuthForm({title, name, buttonText, onSubmit, children}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      password,
      email
    })
  }

  return (
    <main className="content">
      <section className="auth">
        <h1 className="auth__name-value">{title}</h1>
        <form name={name} onSubmit={handleSubmit} className="auth__form">
          <div className="auth__input">
            <input
              required
              id="email-input"
              name="email"
              type="email"
              value={email}
              placeholder="Email"
              onChange={handleEmailChange}
              className="auth__text auth__text_type_email"
            />
            <span className="auth__error email-input-error"></span>
          </div>
          <div className="auth__input">
            <input
              required
              id="password-input"
              name="password"
              type="password"
              value={password}
              placeholder="Пароль"
              onChange={handlePasswordChange}
              className="auth__text auth__text_type_password"
            />
            <span className="auth__error password-input-error"></span>
          </div>
            <button type="submit" className="auth__submit-btn">{buttonText}</button>
        </form>
        {children}
      </section>
    </main>
  )
}
