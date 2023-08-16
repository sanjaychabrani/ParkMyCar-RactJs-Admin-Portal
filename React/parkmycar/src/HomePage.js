import React, { useContext, useEffect, useState } from 'react';
import './HomePage.css';
import NavigationBar from './NavigationBar';
import VehicleCategoryPage from './VehicleCategoryPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import BookedParking from './BookedParking';
import TotalIncome from './TotalIncome';
import Parkslot from './Parkslot';
import UserContext from './UserContext';
import AdminTable from './adminDetailsTable';



function HomePage(props) {
  const { onLogout } = props;
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [inVehicleCount, setInVehicleCount] = useState(0);
  const [outVehicleCount, setOutVehicleCount] = useState(0);
  const email2 = useContext(UserContext);
  var owner = "";
  
  useEffect(() => {
      const fetchData = async () => {
        const fetchName = async () => {
          const parkingSlotsQuery2 = query(collection(db, 'parkingLocations'), where('email', '==', email2));
          const snapshot2 = await getDocs(parkingSlotsQuery2);
          snapshot2.forEach((doc) => {
            owner = doc.data().owner;
            console.log(owner);
          });
        };
    
        const fetchInVehicleCount = async () => {
          const adminTableRef = collection(db, 'userBookSlots');
          const querySnapshot = await getDocs(
            query(adminTableRef, where('Cancel', '==', 'False'), where('done', '==', false), where('ParkingName', '==', owner))
          );
          setInVehicleCount(querySnapshot.size);
        };
    
        const fetchOutVehicleCount = async () => {
          const adminTableRef = collection(db, 'userBookSlots');
          const querySnapshot = await getDocs(
            query(adminTableRef, where('Cancel', '==', 'False'), where('done', '==', true), where('ParkingName', '==', owner))
          );
          setOutVehicleCount(querySnapshot.size);
        };
    
        await fetchName();
        await fetchInVehicleCount();
        await fetchOutVehicleCount();
      };
    
      fetchData();
    }, []);    

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };  

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return (
          <div className="home-page">
            <header>
              <h1>Admin Dashboard</h1>
              <button id="logout" onClick={onLogout}>Log Out</button>
            </header>
            <main>
              <NavigationBar currentPage={currentPage} onNavigationClick={handlePageChange} />
              <div class="container-xxl">
                <div class="container my-con">
                  <div class="row ">
                    <div class="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                      <div class="service-item text-center pt-3">
                        <div class="p-4">
                          <i class="fa-solid fa-car fa-3x text-primary mb-4"></i>
                          <h5 class="mb-3">IN VEHICLE</h5>
                          <h1 class="pt-3">{inVehicleCount}</h1>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                      <div class="service-item text-center pt-3">
                        <div class="p-4">
                          <i class="fa-solid fa-car fa-3x text-primary mb-4"></i>
                          <h5 class="mb-3">OUT VEHICLE</h5>
                          <h1 class="pt-3">{outVehicleCount}</h1>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                      <div class="service-item text-center pt-3">
                        <div class="p-4">
                          <i class="fa-solid fa-car fa-3x text-primary mb-4"></i>
                          <h5 class="mb-3">TOTAL VEHICLE</h5>
                          <h1 class="pt-3">{outVehicleCount+inVehicleCount}</h1>
                        </div>
                      </div>
                    </div>
                      <TotalIncome/>
                  </div>
                </div>
              </div>
              
            </main>
          </div>
        );
      case 'Vehicle Category':
        return (
          <div className="home-page">
            <header>
              <h1>Vehicle Category</h1>
              <button onClick={onLogout}>Log Out</button>
            </header>
            <main>
              <NavigationBar currentPage={currentPage} onNavigationClick={handlePageChange} />
              <VehicleCategoryPage />
            </main>
          </div>

        );
      case 'Parking Slots':
        return (
          <div className="home-page">
            <header>
              <h1>Parking Slots</h1>
              <button onClick={onLogout}>Log Out</button>
            </header>
            <main>
              <NavigationBar currentPage={currentPage} onNavigationClick={handlePageChange} />
              <Parkslot />
            </main>
          </div>
        );
      case 'Booked Parking':
        return (
          <div className="home-page">
            <header>
              <h1>Booked Parking</h1>
              <button onClick={onLogout}>Log Out</button>
            </header>
            <main>
              <NavigationBar currentPage={currentPage} onNavigationClick={handlePageChange} />
              <BookedParking />
            </main>
          </div>
        );
        case 'Edit Profile':
  return (
    <div className="home-page">
      <header>
        <h1>Edit Profile</h1>
        <button onClick={onLogout}>Log Out</button>
      </header>
      <main>
        <NavigationBar currentPage={currentPage} onNavigationClick={handlePageChange} />
        <AdminTable/>
      </main>
    </div>
  );


      default:
        return null;
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
}

export default HomePage;