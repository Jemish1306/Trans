// src/App.js
import React from 'react';
import {   Routes, Route } from 'react-router-dom';
import './App.css'
import './index.css'


import New from './Pages/New';


const App = () => {

  return (
    <>
    <Routes>
      
        <Route path="/" element={<New/>} />
        
    </Routes>
    
    </>
  );
};

export default App;
