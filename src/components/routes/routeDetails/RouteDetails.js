import React from 'react'
import './RouteDetails.css'

const RouteDetails=({selectedRoute})=>{
    if (selectedRoute != null){

        const photos = selectedRoute.images.map((e) => {
            return <img src={e} alt="No found"></img>
        });
        const videos = selectedRoute.videos.map((e) => {
            return <video width="320" height="240" controls>
                <source src={e} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        });

        return(
        <div id="description">
            <h2>Nombre : Autor</h2>
            <p>{selectedRoute.name} : {selectedRoute.author}</p>
            <h3>Descripción</h3>
            <p>{selectedRoute.description}</p>
            <h3>Fotos</h3>
            {photos}
            <h3>Videos</h3>
            {videos}
        </div>)
    }
    return (<div></div>)
}

export default RouteDetails