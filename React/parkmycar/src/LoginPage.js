import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './LoginPage.css'; // Add the CSS file for styling

function LoginPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    // Here you can add logic to submit the login form
    props.onLogin(username, password);
  };

  const handleForgotPasswordClick = () => {
    // Navigate to the ForgetPass page
    navigate('/forgot-password');
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleLoginFormSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <label htmlFor="password">Password:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="password-input"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className={`password-toggle-icon ${showPassword ? 'show' : ''}`}
              onClick={handleTogglePasswordVisibility}
            />

          </div>
          <button type="submit">Log In</button>
        </form>
        <button className="forgot-password-button" onClick={handleForgotPasswordClick}>
          Forgot password?
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
