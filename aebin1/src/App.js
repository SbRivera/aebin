import React, { useState } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Avatar from './components/Avatar';
import Footer from './components/Footer';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="App">
      <Header />
      <NavBar activeView={activeView} setActiveView={setActiveView} />
      <main>
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'avatar' && <Avatar />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
