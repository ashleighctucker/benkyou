import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      return setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = async () => {
    await dispatch(login('benkyou@benkyou.com', 'password'));
  };

  return (
    <form className="auth-form" onSubmit={onLogin}>
      <h1>
        Log In to <span className="logo-name">benkyou</span>
      </h1>
      <div className="form-input-containers">
        <label htmlFor="email">Email</label>
        <input
          className="form-inputs"
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
          autoComplete="email"
        />
        <p className="error-display">{errors['email']}</p>
      </div>
      <div className="form-input-containers">
        <label htmlFor="password">Password</label>
        <input
          className="form-inputs"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
          autoComplete="current-password"
        />
        <p className="error-display">{errors['password']}</p>
      </div>
      <div className="form-button-containers">
        <button type="submit" className="auth-form-sumbit-button">
          Log In
          <span className="bg"></span>
        </button>
      </div>
      <span>or</span>
      <div className="form-redirect" onClick={demoLogin}>
        Log In to Demo Account
      </div>
    </form>
  );
};

export default LoginForm;
