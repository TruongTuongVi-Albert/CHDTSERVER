import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Headers from './components/Layout/Header/Header'
import Footers from './components/Layout/Footer/Footer'
import Index from './components/Index/Index'
import './App.css'; // Import global styles if needed

function App() {
  return (
    <BrowserRouter  >
      <Headers />
      <Container>
        <Routes>
          <Route path='/' element={<Index />} />
        </Routes>
      </Container>
      <Footers />
    </BrowserRouter>
  );
}

export default App;
