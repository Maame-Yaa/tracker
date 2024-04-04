import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GeoMap from './GeoMap';


function AddGeoMap() {
  let { name } = useParams();
  const [mapLocation, setLocation] = useState();
  // const navigate = useNavigate();
  const [mapInfo, setMapInfo] = useState([])

  console.log("name", name)

  useEffect(() => {
    // Async function to fetch data and update state
    const fetchData = async () => {
      try {
        // Fetch the geolocation data from Google API
        const googleAPIResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${process.env.REACT_APP_GOOGLEAPI}`);
        if (!googleAPIResponse.ok) {
          throw new Error(`HTTP error! status: ${googleAPIResponse.status}`);
        }
        const data = await googleAPIResponse.json();
        setLocation(data.results[0].geometry.location); // Assume the first result is the one you want

        // Get additional map info from your server
        const serverResponse = await axios.post('http://localhost:2000/api/getMapInfo', { name });
        console.log("serverResponse", serverResponse);
        setMapInfo(serverResponse.data); // Update state with the server response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    return () =>{
        setLocation(null)
        setMapInfo(null)
    }
  }, [name]); 

  const [state, setState] = useState([])
  const {paths} = state

  return (
    <div>
        <GeoMap
            apiKey= {process.env.REACT_APP_GOOGLEAPI}
            center={mapLocation && mapLocation}
            paths = {paths}
            point = {paths=>setState({paths})}
        />
    </div>
  );
}

export default AddGeoMap;
