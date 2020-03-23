import React from 'react'
import { TileLayer, Map, Polyline, LayersControl } from 'react-leaflet'
import './MyMap.css'

export const myMap = (center, positions) => {
    return (
        <div data-testid='mymap-container' id="mapContainer" className="leaflet-container">
            <Map data-testid="mymap-map" zoomControl={false} center={center} zoom={14}>
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked="true" name="OpenStreetMap.Mapnik">
                        <TileLayer data-testid="mymap-tilelayer"
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer checked="false" name="OpenStreetMap.BlackAndWhite">
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>
                
                
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