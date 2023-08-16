import { getFirestore, collection, getDocs, setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Get a Firestore instance
const db = getFirestore();

// Function to retrieve parking areas
export const getParkingAreas = async () => {
  const areasCol = collection(db, "superAdminTable");
  const areasSnapshot = await getDocs(areasCol);
  const areasList = areasSnapshot.docs.map((doc) => ({...doc.data(), 'Doc Id': doc.id}));
  return areasList;
};

// Function to update a parking area
export const updateParkingArea = async (docId, updatedData) => {
  const areasCol = collection(db, "superAdminTable");
  await updateDoc(doc(areasCol, docId), updatedData);
};

// Function to add a new parking area
export const addNewParkingArea = async (newParkingArea) => {
  const areasCol = collection(db, "superAdminTable");
  await setDoc(doc(areasCol), newParkingArea);
};

// Function to delete a parking area
export const deleteParkingArea = async (docId) => {
  const areasCol = collection(db, "superAdminTable");
  await deleteDoc(doc(areasCol, docId));
};
