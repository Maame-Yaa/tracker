import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import AddGeoMap from './Components/AddGeoMap';
import ViewAllMaps from './Components/ViewAllMaps';
import { LoadScript } from '@react-google-maps/api';

function App() {
  return (
    <LoadScript
    libraries={['drawing']}
    id="script-loader"
    googleMapsApiKey={process.env.REACT_APP_GOOGLEAPI}
    language='en'
    region='us'
    >
      <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route exact path="/" component ={Home}/> */}
          <Route path="/map/:name" element={<AddGeoMap />} />
          <Route path="/viewAllMaps" element={<ViewAllMaps />} />
        </Routes>
      </Router>
    </div>
    </LoadScript>
  );
}

export default App;


