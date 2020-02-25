import React from 'react'
import { Card } from 'react-bootstrap'
import {showRoute} from './../../../store/actions/RouteActions'
import { connect } from "react-redux";
import './RouteSummary.css'

function RouteSummary(props) {
    const {route} = props
    //console.log(props)
    return (
        <Card id={props.id} onClick={() => props.showRoute(route)}>
            <div id="blurryBackground"></div>
            <Card.Body>
                <Card.Title>{route.name}</Card.Title>
                <Card.Subtitle>{route.author}</Card.Subtitle>
            </Card.Body>
        </Card>
    )
}

const mapDispatchToProps = (dispatch) =>{
    return {
      showRoute: (route) => dispatch(showRoute(route))
    }
  }
  
  export default connect(null, mapDispatchToProps)(RouteSummary)