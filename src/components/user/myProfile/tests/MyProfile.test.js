import React from 'react';
import {render, queryByTestId ,fireEvent,     getAllByTestId, waitForElement } from  '@testing-library/react';
import '@testing-library/jest-dom';
import MyProfile from '../MyProfile.js';
import  "solid-auth-client";
let component = null; 
let emptyComponent = null;
beforeAll( () => {

    solid.auth.login("https://solid.community")
	const { container } = render(<MyProfile />); 
	component = container;
	

});

describe("Checking the correct behaviour of the profile", ()=>{
	   
	 
	test("If it loads the  cards  correctly", () => {

		waitForElement(() => {

			expect(queryByTestId(component, 'friendCard')).not.toBeNull();
			expect(getAllByTestId(component, 'friendCard').length).toBe(1); 
        });});
	
	

});


	 