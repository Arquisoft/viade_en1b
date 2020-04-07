import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitForDomChange
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { ShareRoute } from "../ShareRoute";
import { findRenderedComponentWithType } from "react-dom/test-utils";
let selectedRoute = {
  name: "Sequoia National Park",
  description: "",
  author: "alvarezgarciamarcos",
  positions: [],
  images: [],
  videos: [],
  sharedWith: [],
  id: 0
};

let selectedRoute2 = {
  name: "Camino de Santiago",
  description: "",
  author: "alvarezgarciamarcos",
  positions: [],
  images: [],
  videos: [],
  sharedWith: [],
  id: 1
};
let inigo = {
  uri: "inigosUri",
  name: "Iñigo"
};

let cesar = {
  uri: "cesarsUri",
  name: "César"
};

let byTestId;
let shareRoute;
let modalOpen;
let modalShare;
let modalClose;
let rerenderFunc = () => {};
let onOpen = jest.fn();
let onClose = jest.fn();
let onSave = jest.fn();
afterEach(cleanup);

beforeEach(() => {
  render(
    <ShareRoute
      selectedRoute={selectedRoute}
      friends={[inigo, cesar]}
      sharedWith={[]}
      shareRoute={onSave}
    ></ShareRoute>
  );
});

describe("Everything renders correctly", () => {
  test("modal opens up", () => {
    expect(screen.queryByText("Pick some friends")).not.toBeInTheDocument();
    expect(screen.queryByTestId("card0")).not.toBeInTheDocument();
    expect(screen.queryByTestId("card1")).not.toBeInTheDocument();

    expect(
      screen.queryByTestId("friend-list-container")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("modalCancelButton")).not.toBeInTheDocument();
    fireEvent.click(screen.queryByText("Share"));
    expect(screen.queryByText("Pick some friends")).toBeInTheDocument();
    expect(screen.queryByTestId("friend-list-container")).toBeInTheDocument();
    expect(screen.queryByTestId("modalCancelButton")).toBeInTheDocument();
    expect(screen.queryByTestId("card0")).toBeInTheDocument();
    expect(screen.queryByTestId("card1")).toBeInTheDocument();
  });
});

describe("Behaviour testing", () => {
  test("friends are selected correctly", () => {
    fireEvent.click(screen.queryByText("Share"));
    expect(screen.queryByTestId("card0")).toBeInTheDocument();
    fireEvent.click(screen.queryByTestId("card0"));
    expect(
      screen.queryByTestId("share-route-share-button-number").textContent
    ).toBe("1");
    fireEvent.click(screen.queryByTestId("card1"));
    expect(
      screen.queryByTestId("share-route-share-button-number").textContent
    ).toBe("2");
    //Deselect
    fireEvent.click(screen.queryByTestId("card0"));
    expect(
      screen.queryByTestId("share-route-share-button-number").textContent
    ).toBe("1");
    fireEvent.click(screen.queryByTestId("card1"));
    expect(
      screen.queryByTestId("share-route-share-button-number")
    ).not.toBeInTheDocument();
  });
  test("once a route is shared with a friend, only the other is visible", () => {
    fireEvent.click(screen.queryByText("Share"));
    fireEvent.click(screen.queryByTestId("card0"));
    expect(
      screen.queryByTestId("share-route-share-button-number").textContent
    ).toBe("1");
    fireEvent.click(screen.queryByTestId("modalSaveButton"));
    expect(onSave).toBeCalled();
    waitForDomChange(() => {
      expect(screen.queryByTestId("card0")).not.toBeInTheDocument();
    });

    //Click again in the share button
    fireEvent.click(screen.queryByTestId("modalButton"));
    expect(screen.queryByText("Iñigo")).not.toBeInTheDocument();
    expect(screen.queryByText("César")).toBeInTheDocument();
  });
});
