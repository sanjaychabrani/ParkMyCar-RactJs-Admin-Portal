import React from 'react';
import './NavigationBar.css';

function NavigationBar(props) {
  const { currentPage, onNavigationClick } = props;

  return (
    <nav className="navbar">
      <ul>
        <li>
          <button onClick={() => onNavigationClick('Dashboard')} className={currentPage === 'Dashboard' ? 'active' : ''}>
            <i className="fas fa-tachometer-alt"></i>
            Dashboard
          </button>
        </li>
        <li>
          <button onClick={() => onNavigationClick('Vehicle Category')} className={currentPage === 'Vehicle Category' ? 'active' : ''}>
            <i className="fas fa-car-side"></i>
            Vehicle Category
          </button>
        </li>
        <li>
          <button onClick={() => onNavigationClick('Parking Slots')} className={currentPage === 'Parking Slots' ? 'active' : ''}>
            <i className="fas fa-parking"></i>
            Parking Slots
          </button>
        </li>
        <li>
          <button onClick={() => onNavigationClick('Booked Parking')} className={currentPage === 'Booked Parking' ? 'active' : ''}>
            <i className="fas fa-ticket-alt"></i>
            Booked Parking
          </button>
        </li>
        <li>
          <button onClick={() => onNavigationClick('Edit Profile')} className={currentPage === 'Edit Profile' ? 'active' : ''}>
            <i className="fas fa-user-edit"></i>
            Edit Profile
          </button>
        </li> 
      </ul>
    </nav>
  );
}

export default NavigationBar;
