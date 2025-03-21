import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />  {/* Dashboard por defecto */}
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </main>
      <Footer /> 
    </Router>
  );
}

export default App;
