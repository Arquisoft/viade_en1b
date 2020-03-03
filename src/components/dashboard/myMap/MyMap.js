import React from 'react'
import { TileLayer, Map } from 'react-leaflet'
import './MyMap.css'

const MyMap = () => {
    return (
        <div id="mapContainer" className="leaflet-container">
            <Map zoomControl={false} center={[43.3605977, -5.8448989]} zoom={15}>
            <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        </Map>
        </div>
    );
}

export default MyMap;