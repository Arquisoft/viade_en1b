import React from 'react'
import './ShareRoute.css'
import {Card } from 'react-bootstrap'
import {List, Value } from '@solid/react';
import ViadeModal from "../../layout/modal/Modal";
import { connect } from "react-redux";
import { shareRoute } from "../../../store/actions/RouteActions";
import {getFriendName} from '../../../solid/profileInfo.js'


function ShareRoute(props) {
  const { selectedRoute } = props;
  var {selectedFriend} = "";
  const { shareRoute } = props;

  var  uniqueKey = 0;
  const setFriendName = async (friendUrl) => {
		uniqueKey++;
		return await getFriendName(friendUrl);
  };
  
  const body = 
  <List src="user.foaf_knows" >
  {
    (item, i) =>
      <Card key={uniqueKey.toString()} onClick={() => selectedFriend=item}>
        <Card.Body> 
        <Card.Link >
							<Value src={setFriendName( `${item}` )}/> 
				</Card.Link> 
        </Card.Body> 
      </Card>

  }


  </List>

    return (
      <ViadeModal
              disabled={false}
              toggleText="Share"
              onClick={() => {shareRoute(selectedRoute, selectedFriend)}}
              title="Choose a friend"
              closeText="Close"
              saveText="Confirm"
              children={body}
            >
            </ViadeModal>
    )
}

const mapDispatchToProps = dispatch => {
  return {
    shareRoute: (route, friendUri) => dispatch(shareRoute(route, friendUri))
  };
};

export default connect(null, mapDispatchToProps)(ShareRoute);
