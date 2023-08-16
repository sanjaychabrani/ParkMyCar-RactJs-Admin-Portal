import React, { useState, useEffect, useContext } from 'react';
import { collection, query, getDocs, where, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import 'firebase/database';
import './Parkslot.css';
import UserContext from './UserContext';

function ParkingslotPage() {
  const [parkingSlots, setParkingSlots] = useState([]);
  const email2 = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const parkingSlotsQuery2 = query(collection(db, 'parkingLocations'), where('email','==',email2));
      const snapshot2 = await getDocs(parkingSlotsQuery2);
      var owner = "";
      snapshot2.forEach((doc) => {
        owner = doc.data().owner;
        console.log(owner);
      });

      const parkingSlotsQuery = query(collection(db, 'userBookSlots'),where('ParkingName','==',owner));
      const snapshot = await getDocs(parkingSlotsQuery);
      const parkingSlotsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        slotNo: doc.data().slotNo,
        slotStatus: doc.data().slotStatus,
        vehicleModel: doc.data().vehicleModel,
        vehicleRegNo: doc.data().vehicleRegisNo,
        email: doc.data().email,
        parkTime: doc.data().parkTime,
        charges: doc.data().charges,
        parkingName: doc.data().ParkingName
      }));

      const parkingSlotsArray = parkingSlotsData.map((parkingSlot) => ({
        slotNo: parkingSlot.slotNo,
        slotStatus: parkingSlot.slotStatus,
        vehicleModel: parkingSlot.vehicleModel,
        vehicleRegNo: parkingSlot.vehicleRegNo,
        email: parkingSlot.email,
        parkTime: parkingSlot.parkTime,
        charges: parkingSlot.charges,
        parkingName: parkingSlot.parkingName
      }));

      setParkingSlots(parkingSlotsArray);
    };

    fetchData();

    return () => {
      setParkingSlots([]);
    };
  }, []);

  return (
    <div className="parking-slot">
      <h2>Parking Slots</h2>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Slot No</th>
            <th>Slot Status</th>
            <th>Vehicle Model</th>
            <th>Vehicle Regis No</th>
            <th>Email</th>
            <th>Parking Name</th>
            <th>Park Time</th>
            <th>Charges</th>
          </tr>
        </thead>
        <tbody>
          {parkingSlots.map((parkingSlot, index) => (
            <tr>
              <td>{index+1}</td>
              <td>{parkingSlot.slotNo}</td>
              <td>{parkingSlot.slotStatus}</td>
              <td>{parkingSlot.vehicleModel}</td>
              <td>{parkingSlot.vehicleRegNo}</td>
              <td>{parkingSlot.email}</td>
              <td>{parkingSlot.parkingName}</td>
              <td>{new Date(parkingSlot.parkTime.seconds * 1000).toLocaleString()}</td>
              <td>{parkingSlot.charges}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParkingslotPage;
