import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SuperAdmin from './SuperAdmin';
import ForgetPass from './FPass';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/forgot-password" element={<ForgetPass />} />
        <Route path="/super" element={<SuperAdmin />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
