import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { collection, addDoc} from 'firebase/firestore';
import { db } from './firebase';
import { useState } from 'react';

export default function MyDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [imageurl, setImageurl] = useState('');
  const [owner, setOwner] = useState('');
  const [totalSlots, setTotalSlots] = useState('');
  const [password, setPassword] = useState('');
  const [SecretKey, setSecretKey] = useState('');


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    try {
        const docRef = await addDoc(collection(db, 'parkingLocations'), {
          address,
          contact,
          email,
          imageurl,
          owner,
          totalSlots: parseInt(totalSlots),
          password,
          SecretKey
        });
        console.log('Document written with ID: ', docRef.id);
        setOpen(false);
        setAddress('');
        setContact('');
        setEmail('');
        setImageurl('');
        setOwner('');
        setTotalSlots('');
        setPassword('');
        setSecretKey('');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} style={{ backgroundColor: "red", color: "white" }}>
      Add a New Location
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Location</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
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
            type="text"
            fullWidth
            variant="standard"
            value={SecretKey}
            onChange={(event) => setSecretKey(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add Location</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
