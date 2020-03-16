import React from 'react'
import './ShareRoute.css'
import FriendList from "../../user/myProfile/FriendList";
import {Button } from 'react-bootstrap'

function ShareRoute(props) {
   

    return (
        <div id = 'shareRoute' className="modal">
        <div className="modal_content">
          <span className="close" >
            &times;
          </span>
          <FriendList/>
          <Button onClick={()=>{
          }}>Compartir</Button>
        </div>
      </div>
    )
}



export default ShareRoute
