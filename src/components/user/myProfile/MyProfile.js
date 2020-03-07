import React from 'react';
import { Image,  useWebId, Value } from '@solid/react';
import './MyProfile.css';
export default function MyProfile() {
    return (
        <div className="GeneralComponent">
		<section>
        		<h1> Profile </h1> 
			<div className="ProfileData">
				<p>Name: <Value  src="user.name"/> </p>
	    			<p>WebID: {useWebId()} </p>
	    			<p>Role: <Value src="user.role"/> </p>
	    			<p>Country: </p>
	    			<p>Email: </p>
	    			<p>Nº friends: </p>
	    		</div>
    			<h1> Routes data </h1>
			<div className="ProfileData">			
				<p>Nº of routes stored: </p>
				<p>Nº of routes shared: </p>
			</div>
	    	</section>
        </div>
    )
}
