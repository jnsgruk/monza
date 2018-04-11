import React from "react"
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps"

const Map = props => {
  const { lat, lon } = props
  
  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: lat, lng: lon }}
    >
      <Marker position={{ lat: lat, lng: lon }}/>
    </GoogleMap>
  )
}

export default withScriptjs(withGoogleMap(Map))
