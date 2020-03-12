import React, { useState }  from 'react';
import { Image, useWebId, Value } from '@solid/react';
import './MyProfile.css';
import {  Row, Col, Container } from 'react-bootstrap';
import  FriendList from './FriendList.js' ;
import {getEmail} from '../../../solid/profileInfo.js'




export default function MyProfile() {
	const  [theEmail , setTheEmail] = useState("");

	const setAllStates = async () => {
		setTheEmail(await getEmail())		
	};

	const redirect = () => {

    		window.location.href = "/dashboard" ;

	}
	setAllStates();

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
