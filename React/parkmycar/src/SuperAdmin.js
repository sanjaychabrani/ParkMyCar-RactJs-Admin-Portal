import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { db } from './firebase';
import './SuperAdmin.css';
import MyDialog from './formDialog';
import { useNavigate } from 'react-router-dom';
import Home from './Home';

function FirebaseTable() {
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [updatedRow, setUpdatedRow] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true); // set initial value to true for testing purposes
  const navigate = useNavigate();

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'parkingLocations'));
    const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setData(documents);
  };

  const handleUpdate = async (index) => {
    try {
      const docRef = doc(db, 'parkingLocations', index);
      await updateDoc(docRef, updatedRow);
      console.log('Document successfully updated!');
      setEditingIndex(-1);
      setUpdatedRow({});
      fetchData();
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'parkingLocations', id));
        console.log('Document successfully deleted!');
      } catch (error) {
        console.error('Error removing document: ', error);
      }
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  const onRowClick = (index2) => {
    setEditingIndex(index2);
  }

  if (!isLoggedIn) {
    localStorage.setItem('isLoggedIn','false')
    navigate('/')
    return <Home />;
  }

  return (
      <div className="super-admin">
        <header>
          <h1>Super Admin Dashboard</h1>
          <MyDialog/>
          <button onClick={handleLogout} className="logout-button">Log Out</button>
          {/* <button onClick={onLogout} className="logout-button">Log Out</button> */}
        </header>
        <table  style={{ fontSize: '10px' }}>
          <thead>
            <tr>
              <th>Address</th>
              <th>Contact No</th>
              <th>Email</th>
              {/* <th>Image URL</th> */}
              <th>Owner</th>
              <th>Total Slots</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id} onClick={() => onRowClick(index)}>
                <td>{editingIndex === index ? <input defaultValue={row.address} onChange={(e) => setUpdatedRow({ ...updatedRow, address: e.target.value })} /> : row.address}</td>
<td>{editingIndex === index ? <input defaultValue={row.contact} onChange={(e) => setUpdatedRow({ ...updatedRow, contact: e.target.value })} /> : row.contact}</td>
<td>{editingIndex === index ? <input defaultValue={row.email} onChange={(e) => setUpdatedRow({ ...updatedRow, email: e.target.value })} /> : row.email}</td>
{/* <td>{editingIndex === index ? <input defaultValue={row.imageurl} onChange={(e) => setUpdatedRow({ ...updatedRow, imageurl: e.target.value })} /> : row.imageurl}</td> */}
<td>{editingIndex === index ? <input defaultValue={row.owner} onChange={(e) => setUpdatedRow({ ...updatedRow, owner: e.target.value })} /> : row.owner}</td>
<td>{editingIndex === index ? <input  type="number" defaultValue={row.totalSlots} onChange={(e) => setUpdatedRow({ ...updatedRow, totalSlots: parseInt(e.target.value)})} /> : parseInt(row.totalSlots)}</td>
              <td>
                {editingIndex === index ? (
                  <>
                    <button onClick={() => handleUpdate(row.id)} style={{margin: '10px'}}>Save</button>
                    <button onClick={() => setEditingIndex(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingIndex(index)} style={{margin: '10px'}}>Edit</button>
                    <button onClick={() => handleDelete(row.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default FirebaseTable;
