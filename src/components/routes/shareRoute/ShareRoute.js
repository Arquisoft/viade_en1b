import React from 'react'
import './ShareRoute.css'
import FriendList from "../../user/myProfile/FriendList";
import {Button } from 'react-bootstrap'
import { LoggedOut, LoggedIn } from '@solid/react';
import { Redirect } from 'react-router-dom';

function ShareRoute(props) {
   

    return (
      <div id='shareRoute' className="modal">
        <LoggedIn>
          <div className="modal_content">
            <span className="close" >
              &times;
          </span>
            <FriendList />
            <Button onClick={() => {
            }}>Compartir</Button>
          </div>
        </LoggedIn>
        <LoggedOut>
          <Redirect to='/'></Redirect>
        </LoggedOut>

      </div>
    )
}



export default ShareRoute
