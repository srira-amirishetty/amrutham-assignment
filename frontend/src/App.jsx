import React from 'react';
import {Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './screens/Login'
import Register from './screens/Register'
import DoctorsList from './screens/DoctorsList'
import Appointment from './screens/Appointment/Appointment'

const App = () => {

  return (
     <>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
           <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/appointment/:id" element={<Appointment />} />
        </Routes>
      </main>
    </>
  );
};

export default App;