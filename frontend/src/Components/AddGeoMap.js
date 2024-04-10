import React, { useEffect, useRef, useState } from 'react';
import {  useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GeoMap from './GeoMap';


function AddGeoMap() {
  let btnRef = useRef();

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
        const serverResponse = await axios.post('http://localhost:2000/api/getMapInfo', { name:name });
        console.log("serverResponse", serverResponse);
        setMapInfo(serverResponse.data.result); // Update state with the server response
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

  const new_path = JSON.stringify(state.paths)

  console.log("mapInfo", mapInfo[0])

  // const saveMap = () => {
  //   if (mapInfo && mapInfo.result && mapInfo.result[0]) { // Check that the data is loaded
  //     const parentId = mapInfo.result[0].id;
  //     axios.post("http://localhost:2000/api/addMap", { parentId: parentId, coordinates: new_path })
  //       .then(response => {
  //         if (response.status === 200) {
  //           console.log(response);
  //           alert('Polygon added successfully');
  //         } else {
  //           alert('Something went wrong');
  //         }
  //       }).catch(err => {
  //         console.error(err);
  //         alert('Something went wrong');
  //       });

  //     if (btnRef.current) {
  //       btnRef.current.setAttribute("disabled", "disabled");
  //     }
  //   } else {
  //     alert('Map information is not loaded yet');
  //   }
  // };

  const saveMap = ()=>{
    if (mapInfo.length > 0 && mapInfo[0]) {
      axios.post("http://localhost:2000/api/addMap", { parentId: mapInfo[0].id, coordinates: new_path })
        .then(response => {
          if (response.status === 200) {
            console.log('Polygon added:', response.data);
            alert('Polygon added successfully');
          } else {
            // If the server returns a status other than 200 OK, but doesn't throw an error
            console.error('Error adding polygon:', response);
            alert('Something went wrong while saving the polygon');
          }
        })
        .catch(err => {
          // Catch any error that occurred during the request
          console.error('Request failed:', err);
          alert(`Error: ${err.response.data.message || 'Request failed'}`);
        });
    } else {
      alert('Map information is not loaded yet');
    }
    if(btnRef.current){
      btnRef.current.setAttribute("disabled","disabled")
    }
  }

  return (
    <div>
        <GeoMap
            apiKey= {process.env.REACT_APP_GOOGLEAPI}
            center={mapLocation && mapLocation}
            paths = {paths}
            point = {paths=>setState({paths})}
        />

    {
      paths && paths.length > 1
      ?
      <button ref={btnRef} onClick={saveMap}>Save Map</button>
      :
      null
    }

    </div>
  );
}

export default AddGeoMap;
