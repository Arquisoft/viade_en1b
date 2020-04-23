import { render, fireEvent, screen, wait } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { FriendList } from "../FriendList";
import TestingRouter from "../../../routing/utils/TestingRouter";

const mockOnClick = jest.fn();
const mockFriends = [
  { name: "mockFriend", uri: "https://viandetest2020.solid.community" },
  {
    name: "mockFriend2",
    uri: "https://viandetest2020.solid.community",
    checked: true,
  },
];
beforeEach(() => {
  window.location = { href: mockFriends[0].uri + "profile/card#me" };
});
describe("FriendList component", () => {
  test("renders correctly with normal setting", () => {
    render(<FriendList friends={mockFriends}></FriendList>);
    expect(screen.queryByTestId("friend-list-container")).toBeInTheDocument();
    expect(screen.queryByTestId("friend-list-main")).toBeInTheDocument();
    expect(screen.queryByTestId("friend-list-card0")).toBeInTheDocument();
    expect(screen.queryByTestId("friend-list-friend-uri0")).toBeInTheDocument();

    expect(
      screen.queryByTestId("friend-list-friend-name0")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("friend-list-card1")).toBeInTheDocument();
    expect(screen.queryByTestId("friend-list-friend-uri1")).toBeInTheDocument();

    expect(
      screen.queryByTestId("friend-list-friend-name1")
    ).toBeInTheDocument();
  });
  test("renders correctly with checkbox setting", () => {
    render(
      <FriendList
        checked
        onClick={mockOnClick}
        friends={mockFriends}
      ></FriendList>
    );
    expect(screen.queryByTestId("friend-list-main")).toBeInTheDocument();
    expect(screen.queryByTestId("card0")).toBeInTheDocument();

    expect(mockOnClick).not.toBeCalled();
    fireEvent.click(screen.queryByTestId("card0"));
    expect(mockOnClick).toBeCalled();
    expect(screen.queryByTestId("friend-list-check1")).toBeInTheDocument();
  });
  test("change location", () => {
    const { container } = render(
      <TestingRouter
        redirectUrl={mockFriends[0].uri}
        ComponentWithRedirection={() => <FriendList friends={mockFriends} />}
      />
    );
    const redirectUrl = mockFriends[0].uri;
    expect(container.innerHTML).toEqual(expect.stringContaining(redirectUrl));
  });
});
