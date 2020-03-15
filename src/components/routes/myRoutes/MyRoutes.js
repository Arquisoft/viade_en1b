import React from 'react'
import styles from './MyRoutes.module.css'
import RouteList from '../routeList/RouteList';
import RouteDetails from '../routeDetails/RouteDetails';
import {connect} from 'react-redux'
import { showRoute } from '../../../store/actions/RouteActions';

function MyRoutes(props) {
    const {routes} = props
    const {selectedRoute} = props
    const {showRoute} = props

    return (
        <div className={styles.routesContainer}>
            <RouteList className={styles.routeList} currentMap={selectedRoute} routes={routes} onClick = {showRoute} />
            <RouteDetails className={styles.routeDetails} selectedRoute={selectedRoute}></RouteDetails>
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
