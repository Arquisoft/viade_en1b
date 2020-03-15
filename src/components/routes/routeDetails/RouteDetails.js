import React from 'react'
import styles from './RouteDetails.module.css'
import Slideshow from '../../layout/slideshow/Slideshow'


const RouteDetails=(props) => {
    const {selectedRoute} = props
    if (selectedRoute != null){

        const photos = selectedRoute.images.map((e) => {
            return <img src={e} alt="Not found"></img>
        });

        const videos = selectedRoute.videos.map((e) => {
            return <video width="320" height="240" controls>
                <source src={e} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        });

        const description = selectedRoute.description ? selectedRoute.description : 'There is not description for this route'

        return(
        <div className={props.style ? props.style : styles.details}>
            <h3>Descripción</h3>

            <p>{description}</p>
            <h3>Fotos</h3>
            <Slideshow images={photos}>
            </Slideshow>
            <h3>Videos</h3>
            <Slideshow images={videos}>
            </Slideshow>
            
        </div>)
    }
    return (<div></div>)
}

export default RouteDetails