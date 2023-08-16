import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import UserContext from './UserContext';
import './adminDetailsTable.css'

export default function AdminTable() {
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [imageurl, setImageurl] = useState('');
  const [owner, setOwner] = useState('');
  const [totalSlots, setTotalSlots] = useState('');
  const [password, setPassword] = useState('');
  const [SecretKey, setSecretKey] = useState('');
  const email2 = useContext(UserContext);

  const handleAdd = async () => {
    try {
      const parkingSlotsQuery = query(collection(db, 'parkingLocations'), where('email', '==', email2));
      const snapshot = await getDocs(parkingSlotsQuery);
      
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        setEmail(data.email);
        setAddress(data.address);
        setContact(data.contact);
        setImageurl(data.imageurl);
        setOwner(data.owner);
        setTotalSlots(data.totalSlots.toString());
        setPassword(data.password);
        setSecretKey(data.SecretKey);
      });
      
    } catch (error) {
      console.error('Error retrieving document: ', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const parkingSlotsQuery = query(collection(db, 'parkingLocations'), where('email', '==', email2));
      const snapshot = await getDocs(parkingSlotsQuery);

      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      snapshot.forEach((doc) => {
        const parkingLocationRef = doc.ref;
        updateDoc(parkingLocationRef, {
          email,
          address,
          contact,
          imageurl,
          owner,
          totalSlots: parseInt(totalSlots),
          password,
          SecretKey,
        });
      });

      console.log('Document updated successfully.');

    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  

  useEffect(() => {
    handleAdd();
  }, []);

  return (
    <div className="container">
        <div className='form'>
      <h2>Update Details</h2>
      <Button variant="contained" onClick={handleUpdate}>
          Update
        </Button>
      <TextField
        margin="dense"
        id="email"
        label="Email Address"
        type="text"
        fullWidth
        variant="standard"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="nope"
      />
      <TextField
        margin="dense"
        id="contact"
        label="Contact Number"
        type="text"
        fullWidth
        variant="standard"
        value={contact}
        onChange={(event) => setContact(event.target.value)}
      />
      <TextField
        margin="dense"
        id="address"
        label="Address"
        type="text"
        fullWidth
        variant="standard"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />
      <TextField
        margin="dense"
        id="url"
        label="Image Url"
        type="text"
        fullWidth
        variant="standard"
        value={imageurl}
        onChange={(event) => setImageurl(event.target.value)}
      />
      <TextField
        margin="dense"
        id="owner"
        label="Owner"
        type="text"
        fullWidth
        variant="standard"
        value={owner}
        onChange={(event) => setOwner(event.target.value)}
      />
      <TextField
        margin="dense"
        id="slots"
        label="Total Slots Number"
        type="number"
        fullWidth
        variant="standard"
        value={totalSlots}
        onKeyPress={(event) => {
          const charCode = event.which ? event.which : event.keyCode;
          if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
          }
        }}
        onChange={(event) => setTotalSlots(event.target.value)}
      />
      <TextField
        margin="dense"
        id="password"
        label="Password"
        type="password"
        fullWidth
        variant="standard"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <TextField
        margin="dense"
        id="SecretKey"
        label="SecretKey"
        type="password"
        fullWidth
        variant="standard"
        value={SecretKey}
        onChange={(event) => setSecretKey(event.target.value)}
      />
      </div>
    </div>
  );
}
