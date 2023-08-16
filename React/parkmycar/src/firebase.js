// Import the Firebase products that you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGGWy-FWEBOFis07l6nQ43dtwxxdlGWfM",
  authDomain: "parkmycar-72795.firebaseapp.com",
  projectId: "parkmycar-72795",
  storageBucket: "parkmycar-72795.appspot.com",
  messagingSenderId: "667039082506",
  appId: "1:667039082506:web:27f76e9e39e133104b97f3",
  measurementId: "G-V8CG02SJMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a Firestore instance
export const db = getFirestore(app);

// Export the function to retrieve parking areas
export const getParkingAreas = async () => {
  const areasCol = collection(db, "superAdminTable");
  const areasSnapshot = await getDocs(areasCol);
  const areasList = areasSnapshot.docs.map((doc) => ({ ...doc.data(), "Doc Id": doc.id }));
  return areasList;
};

