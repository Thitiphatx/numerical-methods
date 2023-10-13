import React from 'react';
import './App.css';
import HomeNav from './navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';

// pages
import Home from './pages/home';

// Root of equation
import Bisection from './pages/root_of_equation/bisection';
import Onepoint from './pages/root_of_equation/onepoint.js';
import Graphical from './pages/root_of_equation/graphical';
import FalsePosition from './pages/root_of_equation/falseposition';
import NewtonRaphson from './pages/root_of_equation/newtonraphson';

// Interpolation
import Lagrange from './pages/Interpolation/lagrange.js';
import Spline from './pages/Interpolation/Spline';
import Secant from './pages/root_of_equation/secant';
import GaussJordan from './pages/Matrix/gaussjordan';
import GaussElimination from './pages/Matrix/gausselimination';
import Cramer from './pages/Matrix/cramer';

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
              <Route path="/secant" element={<Secant />} />

              <Route path="/cramerrule" element={<Cramer />}/>
              <Route path="/gausselimination" element={<GaussElimination />} />
              <Route path="/gaussjordan" element={<GaussJordan />} />

              <Route path="/lagrangeinter" element={<Lagrange />} />
              <Route path="/spline" element={<Spline />} />
            </Routes>
          </Container>
        </main>
      </div>
      <footer className="text-center text-muted bg-light">
        <div className="pt-3">
          <p>KMUTNB, Numerical Methods</p>
          <p>Thitiphat Kunrong 6504062630081</p>
        </div>
      </footer>
    </BrowserRouter>
    
  );
}

export default App;
