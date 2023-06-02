import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister/LoginRegister';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Prediction from './pages/PredictionPage/Prediction';
import './App.css'
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/loginRegister" element={<LoginRegister/>} />
        <Route path="/prediction" element={<Prediction/>} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
