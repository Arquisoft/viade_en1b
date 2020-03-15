import React from 'react'
import styles from './MyRoutes.module.css'
import RouteList from '../routeList/RouteList';
import RouteDetails from '../routeDetails/RouteDetails';
import {connect} from 'react-redux'
import { showRoute } from '../../../store/actions/RouteActions';
import { deleteRoute } from '../../../store/actions/RouteActions';
import { Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";

function MyRoutes(props) {
    const {routes} = props
    const {selectedRoute} = props
    const {showRoute} = props
    const {deleteRoute} = props
    let history = useHistory();

    const routeChange=()=> {
        history.push("/routes/ShareRoute")
    }

    return (
            <div className={styles.routesContainer}>
                <RouteList style={styles.routeList} currentMap={selectedRoute} routes={routes} onClick = {showRoute} />
                <RouteDetails style={styles.routeDetails} selectedRoute={selectedRoute}></RouteDetails>
                <div id="buttons">
                    <Button id="deleteButton" onClick={deleteRoute}>
                            Eliminar
                    </Button>
                    <Button id="shareButton" onClick={routeChange}>
                            Compartir
                    </Button>
                </div>
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
      showRoute: (route) => dispatch(showRoute(route)),
      deleteRoute: () => dispatch(deleteRoute())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(MyRoutes)
