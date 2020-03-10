import React, {useEffect, useContext,   setState, useState, useRef}  from 'react';
import { Card    } from 'react-bootstrap';
import { Image, useWebId, List, Value} from '@solid/react';
import data from '@solid/query-ldflex' ;


export default function MyProfile() {
	var  uniqueKey = 0; 

	async function getFriendName(friendWebId){
		
			const fixedFriendWebId = friendWebId + "profile/card#me";
			uniqueKey = uniqueKey +1;
			return  await data[fixedFriendWebId].name; 
	}
	const getProfileUrl = (podUrl) =>{ return podUrl + "profile/card#me" }
	

	

	return (
        <div>
		<h1>Friends list:  </h1>
		
		<div className="FriendList">
		<List src="user.foaf_knows" >
		{
			(item, i) => 

				<Card id={uniqueKey.toString()}>
					<Card.Body> 
						<Card.Link href= {getProfileUrl(`${item}` ) } >
							<Value src={ getFriendName( `${item}` )}/> 
						</Card.Link> 
					</Card.Body> 
				</Card>

		}


		</List>
		</div>
	</div>
	)
}
