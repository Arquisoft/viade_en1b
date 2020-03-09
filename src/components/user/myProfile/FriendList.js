import React, {useEffect, useContext,   setState, useState, useRef}  from 'react';
import { Card    } from 'react-bootstrap';
import { Image, useWebId, List, Value} from '@solid/react';
import data from '@solid/query-ldflex' 






function getFriendName(friendWebId){

		

}

export default function MyProfile() {
	



	return (
        <div>
		<h1>Friends list:  </h1>
		
		<div className="FriendList">
		<List src="user.foaf_knows" >
		{
			(item, i) => 

				<Card>
					<Card.Body> { getFriendName( `${item}` )} </Card.Body> 
				</Card>




		}


		</List>
		</div>
	</div>
	)
}
