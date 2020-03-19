import React from 'react';
import {render, queryByTestId ,fireEvent,     getAllByTestId, waitForElement } from  '@testing-library/react';
import '@testing-library/jest-dom';
import FriendList from '../FriendList.js';

let component = null; 
let emptyComponent = null;
beforeAll( () => {


	const { container } = render(<FriendList id="friendList"value="[https://viandetest2020.solid.community/profile/card#me].foaf_knows"/>); 
	component = container;
	const {emptyContainer}  = render(<FriendList id="friendList"value=""/>);  
	emptyComponent = emptyContainer;

});

describe("Checking the correct behaviour of the FriendList", ()=>{
	   
	 
	test("If it loads the  cards  correctly", () => {

		waitForElement(() => {

			expect(queryByTestId(component, 'friendCard')).not.toBeNull();
			expect(getAllByTestId(component, 'friendCard').length).toBe(1); 
        });});
	
	test("If when you click in the friend card, it loads the new page", () => {
		waitForElement( () => {

			expect(queryByTestId(component, 'friendCard')).not.toBeNull();   
			fireEvent.click( queryByTestId(component, 'FriendCard'));
			expect(window.location.href).toEqual("https://lamasumas.inrupt.net/profile/card#me");

	} )});


	test("If the user has no friends", () => {
		waitForElement( () => {
			expect( () => getAllByTestId(emptyComponent, 'friendCard')).toBeNull(); 
		});

	 });


});


	 



