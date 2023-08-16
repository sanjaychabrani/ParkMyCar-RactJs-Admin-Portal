import React, { useContext, useEffect, useState } from 'react';
import { db } from './firebase';
import './VehicleCategoryPage.css';
import UserContext from './UserContext';
import { collection, query, getDocs, where} from 'firebase/firestore';

function VehicleCategoryPage() {
  const [vehicleSlots, setVehicleSlots] = useState([]);
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
  
      const fetchVehicleSlots = async () => {
        try {
          const slotsRef = query(collection(db, 'userBookSlots'), where('ParkingName', '==', owner));
          const querySnapshot = await getDocs(slotsRef);
          const slots = querySnapshot.docs.map((doc) => doc.data());
          setVehicleSlots(slots);
        } catch (error) {
          console.log('Error fetching vehicle slots:', error);
        }
      };
  
      await fetchName();
      await fetchVehicleSlots();
    };
  
    fetchData();
  }, []); 
  
  
  return (
    <div className="vehicle-category">
      <h2>Vehicle Category</h2>
      <table>
        <thead>
          <tr>
            <th>Vehicle Model</th>
            <th>Vehicle Registration No</th>
            <th>Slot No</th>
            <th>Charges</th>
          </tr>
        </thead>
        <tbody>
          {vehicleSlots.map((slot, index) => (
            <tr key={index}>
              <td>{slot.vehicleModel}</td>
              <td>{slot.vehicleRegisNo}</td>
              <td>{slot.slotNo}</td>
              <td>{slot.charges}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleCategoryPage;
