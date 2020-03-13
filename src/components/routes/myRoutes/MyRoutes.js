import React from 'react'
import './MyRoutes.css'
import RouteList from '../routeList/RouteList';
import RouteDetails from '../routeDetails/RouteDetails';
import {connect} from 'react-redux'
import { showRoute } from '../../../store/actions/RouteActions';

function MyRoutes(props) {
    const {routes} = props
    const {selectedRoute} = props
    const {showRoute} = props

    return (
        <div className="myroutes container">
            <h2>Lista de Rutas</h2>
            <RouteList currentMap={selectedRoute} routes={routes} onClick = {showRoute} />
            <RouteDetails selectedRoute={selectedRoute}></RouteDetails>
        </div>
    )
}

const mapStateToProps = (state) =>{
    console.log(state)
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
