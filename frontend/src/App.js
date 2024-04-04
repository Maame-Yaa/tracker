import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import AddGeoMap from './Components/AddGeoMap';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route exact path="/" component ={Home}/> */}
          <Route path="/map/:name" element={<AddGeoMap />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


