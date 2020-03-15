import React from 'react'
import './ShareRoute.css'
import FriendList from "../../user/myProfile/FriendList";
import {Button } from 'react-bootstrap'

function ShareRoute(props) {

    return (
        <div id="shareRoute">
            <FriendList id="friendList" />
            <Button id="shareButton">Compartir</Button>
        </div>
    )
}

export default ShareRoute
