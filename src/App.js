// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import WhoWeAre from './components/WhoWeAre'
import Team from './components/Team';
import Services from './components/Services';
import Numbers from './components/Numbers';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'; // Importe o botão
import './index.css';

function App() {
  return (
    <div>
      <Navbar />
      <Banner />
      <WhoWeAre />
      <Team />
      <Numbers />
      <Services />
      <Contact />
      <Blog />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
