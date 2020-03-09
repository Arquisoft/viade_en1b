import React, {useEffect, useContext,   setState, useState, useRef}  from 'react';
import { Image, useWebId, Value } from '@solid/react';
import data from '@solid/query-ldflex' 
import './MyProfile.css';
import { Button,  Row, Col, Container } from 'react-bootstrap';
import  FriendList from './FriendList.js' 





export default function MyProfile() {

	const  [theEmail , setTheEmail] = useState(""); 


	const getEmail = async () =>  {

		const  emailsId = await data.user[ 'http://www.w3.org/2006/vcard/ns#hasEmail' ].value ;	
		const firstEmail = await data[emailsId].vcard_value.value; 
		const emailParsed = firstEmail.split(":")[1]
		setTheEmail(emailParsed) 

	}
	getEmail() ; 
	
	const redirect = () => {

    		window.location.href = "/dashboard" ;

	}



	return (
        <div className="GeneralComponent " >
		<Container className="Container">
			<Row>
				<Col>
				<div className="AllData">
					<h1> Profile </h1> 
				<div className="ProfileData">
						<p>Name: <Value  src="user.name"/> </p>
						<p>WebID: {useWebId()} </p>
						<p>Role: <Value src="user.vcard_role"/> </p>
						<p>Email: {theEmail} </p>
					</div>
					<h1> Routes data </h1>
					<div className="ProfileData">			
						<p>Nº of routes stored: </p>
						<p>Nº of routes shared: </p>
					</div>
					<FriendList />
				</div>
				</Col>
				<Col>
					<Image src="user.vcard_hasPhoto" defaultSrc="profile.svg" className="profile profilePicture"/>
				</Col>
			</Row>
	
	<button onClick={redirect}> Return  </button>	
	    	</Container>
        </div>
    )
}
