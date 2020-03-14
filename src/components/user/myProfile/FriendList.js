import React from 'react';
import { Card  } from 'react-bootstrap';
import {  List, Value} from '@solid/react';
import {getFriendName} from '../../../solid/profileInfo.js'
import './FriendList.css'

export default function MyProfile() {
	var  uniqueKey = 0; 
	
	
	const getProfileUrl = (podUrl) =>{ return podUrl + "profile/card#me" }
	const openProfile = (friendProfile) => {window.location.href = friendProfile + "profile/card#me" ; }	
	const setFriendName = async (friendUrl) => {
		uniqueKey++;
		return await getFriendName(friendUrl);
	};

	return (
        <div id="friendListContainer">
		<h1>Friends list:</h1>
		
		<div className="FriendList">
		<List src="user.foaf_knows" >
		{
			(item, i) =>
				<Card key={uniqueKey.toString()} onClick={() => openProfile(`${item}` )}>
					<Card.Body> 
						<Card.Link href= {getProfileUrl(`${item}` ) } >
							<Value src={setFriendName( `${item}` )}/> 
						</Card.Link> 
					</Card.Body> 
				</Card>

		}


		</List>
		</div>
	</div>
	)
}
