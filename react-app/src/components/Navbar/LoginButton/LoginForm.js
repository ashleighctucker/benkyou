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
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form className="auth-form" onSubmit={onLogin}>
      <h1>
        Log In to <span className="logo-name">Manabu</span>
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
        />
        <p className="error-display">{errors['password']}</p>
      </div>
      <div className="form-button-containers">
        <button type="submit" className="form-sumbit-button">
          Log In
          <span className="bg"></span>
        </button>
      </div>
      <div className="form-redirect">Don't have an account?</div>
    </form>
  );
};

export default LoginForm;
