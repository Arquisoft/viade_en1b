import React from 'react'
import './Settings.css'
import { ToggleButton, ButtonGroup } from 'react-bootstrap';



export default function Settings(props) {
	

	const setTheme = (params) => {

	var paramValue = params.target.value;


	}





	return(
		<div className="GeneralComponent">

			<h1> Settings </h1>
			<ButtonGroup toggle onChange={setTheme} > 
				<ToggleButton type="radio" name="radio" defaultChecked value="Normal">
					Normal
			    	</ToggleButton>
				<ToggleButton type="radio" name="radio" value="Dark">				      
					Dark 
				</ToggleButton>
				<ToggleButton type="radio" name="radio" value="Blind">
					Blind
				</ToggleButton>

			</ButtonGroup>
		</div> 
	)
}
