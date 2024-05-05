import React, {useEffect, useState} from 'react'
import { Button, Table } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Map1 from './Map1';
// import ViewAllMaps from './ViewAllMaps';
import ViewAllMaps from './ViewAllMaps2';
import io from 'socket.io-client';


export default function Home() {

    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [allMaps, setAllMaps] = useState([])
    let message=''

    const [trackerPosition, setTrackerPosition] = useState({
      latitude: 6,
      longitude: -1
    });
  
    useEffect(() => {
      const socket = io('http://localhost:2000'); // Connect to the backend server directly
    
      // Listen for real-time updates from your backend
      socket.on('trackerUpdate', (data) => {
        console.log('Received tracker update:', data);
        setTrackerPosition({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      });
    
      // Clean up the socket connection when the component unmounts
      return () => socket.disconnect();
    }, []);
    
  
    useEffect(() => {
      console.log('trackerPosition:', trackerPosition);
    }, [trackerPosition]);
  
    
    const addName = async () => {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${process.env.REACT_APP_GOOGLEAPI}`);
        const place = await response.json();
    
        if (place && place.results.length > 0) {
          const latitude = place.results[0].geometry.location.lat;
          const longitude = place.results[0].geometry.location.lng;
          
          const serverResponse = await axios.post('http://localhost:2000/api/addName', { name, latitude, longitude });
          
          if (serverResponse.data) {
            message = serverResponse.data.msg;
            navigate(`/map/${name}`);
          }
        } else {
          alert("Entered place is not valid! Try again");
        }
      } catch (error) {
        console.error("Something went wrong", error);
      }
    };
    

    const getAllMaps=()=>{
      axios.get('http://localhost:2000/api/getAllMaps')
      .then(response=>{
        if(response){
          setAllMaps(response.data)
        }

      })
      .catch(err=>console.log(err))

    }

    useEffect(()=>{
      let unmounted = false;
      setTimeout(()=>{
        getAllMaps()
      }, 1000);
      return ()=>{unmounted=true}
    },[])


  return (
    <div className="app-background">
        <div style={{padding:'35px'}}></div>
        <div className='title-container'>
          <h1>Autism Elopement Tracker</h1>
          <br/>
          <div className='input-group'>
            <input type='text' placeholder=' Enter a region and then draw a Geofence' onChange={(e) => setName(e.target.value)} value={name} className='custom-input'/>
            <Button variant="dark" className='custom-button rounded' disabled={name === ""} onClick={addName}>Add</Button>
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <ViewAllMaps latitude={trackerPosition.latitude} longitude={trackerPosition.longitude}/>
        {/* <h3>Geofence List</h3> */}
        <div >
          <Table striped bordered hover className="table-custom">
              <thead className="header-custom">
                <tr>
                  <th>ID</th>
                  <th>PLACE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                  
                    {
                      allMaps.map((map,index)=><Map1 key={map.id} id={map.id} name={map.name} index={index} map={map}/>)
                    }
                  
              </tbody>
          </Table>
        </div>
    </div>
  )
}
