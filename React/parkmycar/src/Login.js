import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    // Here you can add logic to submit the login form
  };

  const handleForgotPasswordClick = () => {
    // Here you can add logic to handle the "forgot password" feature
  };

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleLoginFormSubmit}>
        <label htmlFor="username">Enter username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />
        <label htmlFor="password">Enter password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <button type="submit">Log In</button>
      </form>
      <p>
        <button onClick={handleForgotPasswordClick}>Forgot password?</button>
      </p>
    </div>
  );
}

export default LoginPage;
