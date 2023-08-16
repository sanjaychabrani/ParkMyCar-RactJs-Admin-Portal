import React, { useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import 'firebase/database';
import './BookedParking.css';
import UserContext from './UserContext';

function BookedParking() {
  const [parkingSlots, setParkingSlots] = useState([]);
  const [recordFound, setRecordFound] = useState(false);
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

      const parkingSlotsQuery = query(
        collection(db, 'userBookSlots'),
        where('Cancel', '==', 'False'),
        where('done', '==', false),
        where('ParkingName','==',owner)
      );
  
      const snapshot = await getDocs(parkingSlotsQuery);
      const size = snapshot.size; 
      
      if (size <= 0) {
        setRecordFound(false);
      } else {
      const parkingSlotsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        slotNo: doc.data().slotNo,
        slotStatus: doc.data().slotStatus,
        vehicleModel: doc.data().vehicleModel,
        vehicleRegNo: doc.data().vehicleRegisNo,
        bookTime: doc.data().bookTime,
        charges: doc.data().charges,
        parkingName: doc.data().ParkingName,
        cancelStatus: doc.data().Cancel,
        done: doc.data().done
      }));
  
      const parkingSlotsArray = parkingSlotsData.map((parkingSlot) => ({
        slotNo: parkingSlot.slotNo,
        slotStatus: parkingSlot.slotStatus,
        vehicleModel: parkingSlot.vehicleModel,
        vehicleRegNo: parkingSlot.vehicleRegNo,
        bookTime: parkingSlot.bookTime,
        charges: parkingSlot.charges,
        parkingName: parkingSlot.parkingName,
        cancelStatus: parkingSlot.cancelStatus,
        done: parkingSlot.done
      }));
  
      setParkingSlots(parkingSlotsArray);
      setRecordFound(true);
    }};

    fetchData();

    return () => {
      setParkingSlots([]);
    };
  }, []);

  if (!recordFound) {
    return (
      <div>
        <h2>No Booked Parking Record Found</h2>
      </div>
    );
  }

  return (
    <div className="parking-slot">
      <h2>Booked Parking</h2>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Slot No</th>
            <th>Slot Status</th>
            <th>Vehicle Model</th>
            <th>Vehicle Regis No</th>
            <th>Parking Name</th>
            <th>Book Time</th>
            <th>Charges</th>
            <th>Cancel Status</th>
            <th>Done Status</th> 
          </tr>
        </thead>
        <tbody>
          {parkingSlots.map((parkingSlot, index) => (
            <tr key={parkingSlot.id}>
              <td>{index + 1}</td>
              <td>{parkingSlot.slotNo}</td>
              <td>{parkingSlot.slotStatus}</td>
              <td>{parkingSlot.vehicleModel}</td>
              <td>{parkingSlot.vehicleRegNo}</td>
              <td>{parkingSlot.parkingName}</td>
              <td>{new Date(parkingSlot.bookTime.seconds * 1000).toLocaleString()}</td>
              <td>{parkingSlot.charges}</td>
              <td>{parkingSlot.cancelStatus}</td>
              <td>{parkingSlot.doneStatus ? 'True' : 'False'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookedParking;
