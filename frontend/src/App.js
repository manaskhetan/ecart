import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import getBlockchain from './ethereum'
import Store from './Store'
import Navigation from './Navbar'
import About from './About';
import Help from './Help';

function App() {

  const [paymentProcessor, setPaymentProcessor] = useState(undefined)
  const [dai, setDai] = useState(undefined)

  useEffect(() => {
    const init = async () => {
      const { paymentProcessor, dai } = await getBlockchain()
      setPaymentProcessor(paymentProcessor);
      setDai(dai)
    }
    init();
  }, [])

  if (typeof window.ethereum === 'undefined') {
    return (
      <div className='container'>
        <div className='col-sm-12'>
          <h3 className='heading'>Our Products</h3>
          <p>Please install the latest version of metamask</p>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <Navigation />
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Store paymentProcessor={paymentProcessor} dai={dai} />} />
            <Route exact path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
