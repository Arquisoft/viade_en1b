import React from 'react'
import MyMap from './myMap/MyMap'
import './Dashboard.css'
import RouteList from './../routes/routeList/RouteList';
import {connect} from 'react-redux'
import { getWebId } from '../../solid/auth';
import { showRoute } from '../../store/actions/RouteActions';

function Dashboard(props) {
    const {routes} = props
    const {selectedRoute} = props
    const {showRoute} = props
    //console.log(selectedRoute)
    getWebId().then(x=> console.log(x))
    const currentSelectedMap = selectedRoute == null ? <div id='titleHolder'><h1>Routes List</h1></div> : (<div id='titleHolder'>
        <h1>{selectedRoute.name}</h1> <p> by {selectedRoute.author}</p>
    </div>)

    return (
        <div className="dashboard container">
            {currentSelectedMap}
            <RouteList currentMap={selectedRoute} routes={routes} onClick = {showRoute} />
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

const mapDispatchToProps = (dispatch) =>{
    return {
      showRoute: (route) => dispatch(showRoute(route))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

