import React from 'react';
import './App.css';
import HomeNav from './navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Home from './pages/home';
import Bisection from './pages/bisection';
import Lagrange from './pages/lagrange.js';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HomeNav/>
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bisection" element={<Bisection />} />
              <Route path="/lagrange" element={<Lagrange />} />
            </Routes>
          </Container>
        </main>
        
      </div>
    </BrowserRouter>
    
  );
}

export default App;
