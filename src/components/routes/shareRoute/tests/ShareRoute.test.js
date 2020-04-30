import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import  ShareRoute  from "../ShareRoute";
import { locales } from "../../../../utils/locales";
import { IntlProvider } from "react-intl";
import { Provider } from 'react-redux'
import {authReducer} from '../../../../store/reducers/AuthReducer'
import {testStore} from '../../../../utils'

let selectedRoute = {
  name: "Sequoia National Park",
  description: "",
  author: "alvarezgarciamarcos",
  positions: [],
  images: [],
  videos: [],
  sharedWith: [],
  id: 0,
};

let inigo = {
  uri: "inigosUri",
  name: "Iñigo",
};

let cesar = {
  uri: "cesarsUri",
  name: "César",
};

let initState = {

  route: {

    selectedRoute: selectedRoute
  },
  auth: {userWebId: "https://viandetest2020.solid.community/profile/card#me"},
  user:{

    friends: [inigo, cesar]
  },
  control: {},
}

let store = testStore(authReducer, initState)

let onSave = jest.fn();
afterEach(cleanup);

beforeEach(() => {
  render(
    <Provider store={store}>
    <IntlProvider key={"en"} locale={"en"} messages={locales["en"]}>
      <ShareRoute
        selectedRoute={selectedRoute}
        sharedWith={[]}
        shareRoute={onSave}
        userWebId="https://viandetest2020.solid.community/profile/card#me"
      ></ShareRoute>
    </IntlProvider>
    </Provider>
  );
});

describe("Everything renders correctly", () => {
  test("modal opens up", () => {
    expect(screen.queryByText("modalTitle")).not.toBeInTheDocument();
    expect(screen.queryByTestId("card0")).not.toBeInTheDocument();
    expect(screen.queryByTestId("card1")).not.toBeInTheDocument();

    expect(
      screen.queryByTestId("friend-list-container")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("modalCancelButton")).not.toBeInTheDocument();
    fireEvent.click(screen.queryByText("Share"));
    waitForElement(() => {

    expect(screen.queryByText("Pick some friends")).toBeInTheDocument();
    expect(screen.queryByTestId("friend-list-container")).toBeInTheDocument();
    expect(screen.queryByTestId("modalCancelButton")).toBeInTheDocument();
    expect(screen.queryByTestId("card0")).toBeInTheDocument();
    expect(screen.queryByTestId("card1")).toBeInTheDocument();
})
      });
});

describe("Behaviour testing", () => {
  test("friends are selected correctly", () => {
    fireEvent.click(screen.queryByTestId("modalButton"));
    waitForElement(() => {
     expect(screen.queryByTestId("card0")).toBeInTheDocument();
    fireEvent.click(screen.queryByTestId("card0"));
    expect(
      screen.queryByTestId("share-route-share-button-numbers").textContent
    ).toBe("1");
    fireEvent.click(screen.queryByTestId("card1"));
    expect(
      screen.queryByTestId("share-route-share-button-numbers").textContent
    ).toBe("2");
    //Deselect
    fireEvent.click(screen.queryByTestId("card0"));
    expect(
      screen.queryByTestId("share-route-share-button-numbers").textContent
    ).toBe("1");
    fireEvent.click(screen.queryByTestId("card1"));
    expect(
      screen.queryByTestId("share-route-share-button-numbers")
    ).not.toBeInTheDocument();
 
    })
      });
});
