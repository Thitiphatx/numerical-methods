import React from 'react';
import './App.css';
import HomeNav from './navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Home from './pages/home';
import Bisection from './pages/bisection';
import Lagrange from './pages/lagrange.js';
import Onepoint from './pages/onepoint.js';
import Graphical from './pages/graphical';
import { Container } from 'react-bootstrap';
import FalsePosition from './pages/root_of_equation/falseposition';
import Spline from './pages/Interpolation/Spline';
import NewtonRaphson from './pages/root_of_equation/newtonraphson';

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
              <Route path="/onepoint" element={<Onepoint />} />
              <Route path="/graphical" element={<Graphical />} />
              <Route path="/falseposition" element={<FalsePosition />} />
              <Route path="/newtonraphson" element={<NewtonRaphson />} />

              <Route path="/lagrange" element={<Lagrange />} />
              <Route path="/spline" element={<Spline />} />
            </Routes>
          </Container>
        </main>
        
      </div>
    </BrowserRouter>
    
  );
}

export default App;
