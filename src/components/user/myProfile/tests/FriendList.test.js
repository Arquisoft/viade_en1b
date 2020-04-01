import {
    render,
    waitForElement,
    queryByTestId,
    fireEvent
  } from "@testing-library/react";
  import "@testing-library/jest-dom";
import React from "react";
import {FriendList} from "../FriendList";

describe("FriendList component", () => {

    const mockFriends = [
        {name: "mockFriend", uri:"https://viandetest2020.solid.community"}
    ];

    let wrapper;

    const {location} = window;

    beforeEach(() => {
        delete window.location;
        window.location = {href:mockFriends[0].uri+"profile/card#me"};
        const {container} = render(<FriendList friends={mockFriends}></FriendList>);
        wrapper = container;
    });

    afterAll(() => {
        window.location = location;
    });
    
    test("renders correctly", () => {
        waitForElement(() => {
            expect(queryByTestId(wrapper, "friend-list-container")).not.toBeNull();
            expect(queryByTestId(wrapper, "friend-list-heading")).not.toBeNull();
            expect(queryByTestId(wrapper, "friend-list-main")).not.toBeNull();
            expect(queryByTestId(wrapper, "friend-list-card")).not.toBeNull();
            expect(queryByTestId(wrapper, "friend-list-friend-uri")).not.toBeNull();
            expect(queryByTestId(wrapper, "friend-list-firned-name")).not.toBeNull();
        });
    });

    test("change location", () => {
        waitForElement(() => {
            fireEvent.click(queryByTestId(wrapper, "friend-list-card"));
            expect(window.location.href).toBe(mockFriends[0].uri+"profile/card#me");
        });
    });
}); 