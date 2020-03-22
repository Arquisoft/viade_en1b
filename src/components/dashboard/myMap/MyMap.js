import React from 'react'
import { TileLayer, Map, Polyline } from 'react-leaflet'
import './MyMap.css'

export const myMap = (center, positions) => {
    return (
        <div data-testid='mymap-container' id="mapContainer" className="leaflet-container">
            <Map data-testid="mymap-map" zoomControl={false} center={center} zoom={14}>
                <TileLayer data-testid="mymap-tilelayer"
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline data-testid="mymap-polyline" color = {'var(--color-primary)'} positions={positions}></Polyline>
            </Map>
        </div>
    );
};

export const MyMap = (props) => {
    const {positions} = props
    const {center} = props        
    return (
        myMap(center, positions)
    );
}

export default MyMap;