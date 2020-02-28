import React from 'react'
import MyMap from './myMap/MyMap'
import './Dashboard.css'
import RouteList from './../routes/routeList/RouteList';
import {connect} from 'react-redux'
import { useWebId } from '@solid/react';
import { getWebId } from '../../solid/auth';

function Dashboard(props) {
    const {routes} = props
    const {selectedRoute} = props
    //console.log(selectedRoute)
    getWebId().then(x=> console.log(x))
    const currentSelectedMap = selectedRoute == null ? <div id='titleHolder'><h1>Routes List</h1></div> : (<div id='titleHolder'>
        <h1>{selectedRoute.name}</h1> <p> by {selectedRoute.author}</p>
    </div>)

    return (
        <div className="dashboard container">
            {currentSelectedMap}
            <RouteList currentMap={selectedRoute} routes={routes} />
            <MyMap />
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        routes : state.route.routes,
        selectedRoute : state.route.selectedRoute
    }
}

export default connect(mapStateToProps)(Dashboard)
