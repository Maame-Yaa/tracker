import React from 'react'
import { GoogleMap, LoadScript, Polygon, Marker } from '@react-google-maps/api'


function ViewMap({points, setModalView, color, latitude, longitude}) {

  const isValidCoordinate = (coordinate) => {
    return typeof coordinate === 'number' && !isNaN(coordinate);
  };

  return (
    <div className='App'>
    {/* <LoadScript
    id="script-loader"
    googleMapsApiKey={process.env.REACT_APP_GOOGLEAPI}
    language='en'
    region='us'
    > */}
      {
        points.length > 1

        ?
        <GoogleMap
        mapContainerClassName='appmap'
        center={points[0]}
        zoom={12}
        >
        <Polygon 
          path={points}
          options={{
            fillColor: color,
            strokeColor:'#2196F3',
            fillOpacity:0.5,
            strokeHeight:2,
            zindex:1
          }}
        />

          {isValidCoordinate(latitude) && isValidCoordinate(longitude) && (
              <Marker
                position={{ lat: latitude, lng: longitude }}
              />
            )}

        </GoogleMap>
        : 
        null 
      }

      
    {/* </LoadScript> */}

      <br/>
    <button className='custom-button' onClick={()=>setModalView(false)}>Close</button>
</div>
)
}

export default ViewMap