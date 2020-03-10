import React from 'react'
import MyMap from '../../dashboard/myMap/MyMap'
import './MyRoutes.css'
import RouteList from '../routeList/RouteList';
import {connect} from 'react-redux'
import { getWebId } from '../../../solid/auth';
import { showRoute } from '../../../store/actions/RouteActions';

function MyRoutes(props) {
    const {routes} = props
    const {selectedRoute} = props
    const {showRoute} = props
    //console.log(selectedRoute)
    getWebId().then(x=> console.log(x))
    const currentSelectedMap = selectedRoute == null ? <div id='titleHolder'><h1>Routes List</h1></div> : (<div id='titleHolder'>
        <h1>{selectedRoute.name}</h1> <p> by {selectedRoute.author}</p>
    </div>)

    //RouteDetails
    const currentDetails = selectedRoute == null ? <div id='details'><p></p></div> : <div id='details'><p>{selectedRoute.description}</p></div>

    return (
        <div className="myroutes container">
            {currentSelectedMap}
            <RouteList currentMap={selectedRoute} routes={routes} onClick = {showRoute} />
            <MyMap />
            {currentDetails}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyRoutes)