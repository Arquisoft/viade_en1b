import React from 'react';
import './MyProfile.css';
export default function MyProfile() {
    return (
        <div className="GeneralComponent">
		<section>
        		<h1> Profile </h1> 
			<div className="ProfileData">
				<p>Name: </p>
	    			<p>WebID: </p>
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
