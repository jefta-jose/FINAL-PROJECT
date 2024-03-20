import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Layout/Login/Login';
import Welcome from './Layout/Main/Welcome';
import Dashboard from './Layout/Dashboard/Dashboard';
import { BrowserRouter } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
