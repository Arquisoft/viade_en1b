import React from 'react'
import { TileLayer, Map, Polyline } from 'react-leaflet'
import './MyMap.css'

const MyMap = (props) => {
    const {positions} = props
    const {center} = props
    return (
        <div id="mapContainer" className="leaflet-container">
            <Map zoomControl={false} center={center} zoom={14}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline color = {'var(--color-primary)'} positions={positions}></Polyline>
            </Map>
        </div>
    );
}

export default MyMap;