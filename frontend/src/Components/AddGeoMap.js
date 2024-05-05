import React, { useEffect, useRef, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GeoMap from './GeoMap';
import io from 'socket.io-client';


function AddGeoMap() {
  let btnRef = useRef();

  let { name } = useParams();
  const [mapLocation, setLocation] = useState();
  const navigate = useNavigate();
  const [mapInfo, setMapInfo] = useState([])

  const [color,setColor] = useState('Grey')
  let _color = ['Red','Green','Yellow','Blue','Pink','Orange']


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


  const center =mapLocation
  const [state, setState] = useState([])
  const {paths} = state

  const new_path = JSON.stringify(state.paths)
  // console.log('new path',new_path)



  const saveMap = ()=>{
    if (mapInfo.length > 0 && mapInfo[0]) {
      axios.post("http://localhost:2000/api/addMap", { parentId: mapInfo[0].id, coordinates: new_path, color:color })
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

  const handleColorChange =(e)=> setColor(e.target.value)

  return (
    <div className="app-background">

      <select className='custom-button' value={color} onChange={handleColorChange}>
        <option>Select</option>
        {
          _color.map((item,index)=>
          <option key={index}>{item}</option>
          )
        }
      </select>
      <br/>
      <br/>

        <GeoMap
            apiKey= {process.env.REACT_APP_GOOGLEAPI}
            center={center}
            paths = {paths}
            point = {paths=>setState({paths})}
            color = {color}
            setColor = {setColor}
        />

    {
      paths && paths.length > 1
      ?
      <button className='custom-button' ref={btnRef} onClick={saveMap}>Save Map</button>
      :
      null
    }
    <br/>
    <button className='custom-button' onClick={()=>navigate("/")}>Go Back</button>

    </div>
  );
}

export default AddGeoMap;
