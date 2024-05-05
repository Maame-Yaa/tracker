import { GoogleMap, LoadScript, Polygon, OverlayView } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



function ViewAllMaps() {
  const [geoState, setGeoState] = useState([]);
  const navigate = useNavigate();

  const viewAllMaps = () => {
    axios.get('http://localhost:2000/api/viewAllMaps')
      .then(response => {
        // console.log('Raw response data:', response.data);

        const allGeoMaps = response.data.map(maps => {
          try {
              const fixedJSON = fixJSONString(maps.coordinates);
              return fixedJSON ? { color: maps.color, coordinates: fixedJSON } : null;
          } catch (error) {
              console.error('Error in map:', maps, error);
              return null;
          }
      }).filter(map => map !== null);
      
      setGeoState(allGeoMaps);
      
      })
      .catch(error => {
        console.error("Error fetching geofences: ", error);
      });
  };

  useEffect(() => {
    viewAllMaps();
    // The unmounted flag isn't needed since we don't have cleanup logic that depends on it
  }, []);

  function fixJSONString(jsonString) {
    // console.log('Original JSON string:', jsonString);
  
    try {
      let fixedString = jsonString.trim();
  
      // Ensure it starts with '['
      if (!fixedString.startsWith('[')) {
        fixedString = '[' + fixedString;
      }
  
      // Correctly close the JSON string if it ends prematurely
      if (fixedString.endsWith('}')) {
        // If it ends with an object, close with array bracket
        fixedString += ']';
      } else if (!fixedString.endsWith(']')) {
        // If it doesn't end with an array bracket, try to complete the object and then close it
        fixedString = fixedString.replace(/,\s*$/, ''); // Remove trailing comma if any
        if (!fixedString.endsWith('}')) {
          // If it doesn't end with an object, assume it's cut off and try to close it
          fixedString += '}]';
        } else {
          // If it already ends with an object, just close the array
          fixedString += ']';
        }
      }
  
      // Now attempt to parse the fixed JSON string
      const parsedJson = JSON.parse(fixedString);
  
      // Check if the result is an array (as expected for coordinates)
      if (Array.isArray(parsedJson)) {
        return parsedJson;
      } else {
        throw new Error('Parsed JSON is not an array');
      }
    } catch (error) {
      console.error('Error fixing JSON string:', error);
      // Return null to filter out this entry
      return null;
    }
  }
  

  return (
    <div className='App app-background'>

    <h3 style={{padding:'30px'}}>Total Geofences : {geoState && geoState.length}</h3>

    {/* <LoadScript
    id="script-loader"
    googleMapsApiKey={process.env.REACT_APP_GOOGLEAPI}
    language='en'
    region='us'
    > */}
        <GoogleMap
        mapContainerClassName='appmap'
        center={{lat:12.983379, lng:76.0660051}}
        zoom={2}
        >

        {
          geoState !== undefined
          ?
          geoState.map((cords,index)=>{
            return(
              <React.Fragment key={index}>
                    <Polygon 
                  // key={index}
                  path={cords.coordinates}
                  options={{
                  fillColor:cords.color,
                  strokeColor:'#2196F3',
                  fillOpacity:0.5,
                  strokeHeight:2,
                  zindex:1
                }}
                />
                <OverlayView
                  position={cords.coordinates[0]}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                    <div 
                      style={{
                        background:'#203254',
                        padding:'4px 4px',
                        fontSize:'8px',
                        color:'white',
                        borderradius:'10px'
                      }}>                
                      {index+1}
                </div>
                  
                </OverlayView>
              </React.Fragment>
            )
          })
          
        :
        null
        }
        

        </GoogleMap>
        

        
    {/* </LoadScript> */}
    <br/>

    <button className="custom-button" onClick={()=>navigate('/')}>Go Back</button>
</div>
  )
}


export default ViewAllMaps