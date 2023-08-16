import React, { useState } from 'react';
import './ForgetPass.css';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

function FPass() {
  const [email, setEmail] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSecretKeyChange = (event) => {
    setSecretKey(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const parkingLocationsRef = collection(db, 'parkingLocations');
    const querySnapshot = await getDocs(
      query(parkingLocationsRef, where('email', '==', email), where('SecretKey', '==', secretKey))
    );

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      setPassword(data.password);
      console.log('Email:', email);
      console.log('Secret Key:', secretKey);
      console.log('Data:', data); // Log the entire data object
    } else {
      setPassword('Invalid email or secret key');
    }

    console.log('Form submitted:', { email, secretKey, password });
  };

  const handleBackButtonClick = () => {
    navigate('/login');
  };

  return (
    <div className="forget-pass-page">
      <div className="forget-pass-form-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="Email">Email:</label>
          <input type="text" id="Email" value={email} onChange={handleUsernameChange} />
          <label htmlFor="secret-key">Secret Key:</label>
          <input type="text" id="secret-key" value={secretKey} onChange={handleSecretKeyChange} />
          <button  type="submit" id="buttonsub">Submit</button>
          <p>{password}</p>
        </form>
        <button className="back-button" onClick={handleBackButtonClick}>
          Back
        </button>
      </div>
    </div>
  );
}

export default FPass;
