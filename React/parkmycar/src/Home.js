import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import UserContext from './UserContext';

function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); 

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const storedUsername = localStorage.getItem('username'); // New
      if (isLoggedIn === 'true') {
        setLoggedIn(true);
        setUsername(storedUsername); // New
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const adminTableRef = collection(db, 'parkingLocations');
      const querySnapshot = await getDocs(
        query(adminTableRef, where('email', '==', username), where('password', '==', password))
      );
      setUsername(username);
      console.log(username);

      if (querySnapshot.size > 0) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username); // New
        setLoggedIn(true);
      } else {
        const superAdminTableRef = collection(db, 'superAdminTable');
        const superQuerySnapshot = await getDocs(
          query(superAdminTableRef, where('email', '==', username), where('password', '==', password))
        );

        if (superQuerySnapshot.size > 0) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', username); // New
          navigate('/super');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('username'); // New
    setLoggedIn(false);
  };

  return (
    <div className="app">
        <UserContext.Provider value={username}>
      {loggedIn ? (
        <HomePage onLogout={handleLogout}/> 
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
      </UserContext.Provider>
    </div>
  );
}

export default Home;
