import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { RouteDetails } from "../RouteDetails";
import { testStore } from "../../../../utils/index";
import { Provider } from "react-redux";
import { locales } from "../../../../utils/locales";
import { IntlProvider } from "react-intl";
import rootReducer from "../../../../store/reducers/RootReducer";

const initState = {
  auth: { userWebId: "http://testing.inrupt.net/profile/card#me" },
  route: {
    selectedRoute: {
      id: 0,
      name: "Hiking Naranco ",
      author: "César",
      positions: [
        [43.360383711, -5.850650009],
        [43.35763791, -5.842024025],
        [43.360976539, -5.831938919],
        [43.366405318, -5.837775406],
        [43.361382154, -5.844255623],
      ],
      description:
        "A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing",
      images: [
        "https://source.unsplash.com/random/600x600",
        "https://source.unsplash.com/random/602x602",
      ],
      videos: ["futuro video 1", "futuro video 2"],
      sharedWith: [],
    },
  },
  user: {
    friends: [
      {
        name: "Marcos Álvarez",
        uri: "A uri",
      },
    ],
  },
  localeReducer: {},
  loadReducer: {}
};

const store = testStore(rootReducer, initState);
const selectedRoute = {
  id: 0,
  name: "Hiking Naranco ",
  author: "César",
  positions: [
    [43.360383711, -5.850650009],
    [43.35763791, -5.842024025],
    [43.360976539, -5.831938919],
    [43.366405318, -5.837775406],
    [43.361382154, -5.844255623],
  ],
  description:
    "A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing",
  media: [
    "https://source.unsplash.com/random/600x600",
    "https://source.unsplash.com/random/602x602",
  ],
  comments: []
};
let rerenderFunc = () => {};

const unshare = jest.fn();

beforeEach(() => {
  render(
    <Provider store={store}>
      <IntlProvider key={"en"} locale={"en"} messages={locales["en"]}>
        <RouteDetails
          deleteRoute={() => {}}
          //_store={store}
          userWebId = "http://testing.inrupt.net/profile/card#me"
          selectedRoute={selectedRoute}
          unshareRoute = {unshare}
        ></RouteDetails>
      </IntlProvider>
    </Provider>
  );
});

describe("The component is rendered correctly", () => {
  test("all the information is rendered correctly", () => {
    waitForElement(() => {
      expect(screen.queryByTestId("route-details-description")).not.toBeNull();
      expect(screen.queryByTestId("route-details-button-share")).not.toBeNull();
      expect(
        screen.queryByTestId("route-details-button-delete")
      ).not.toBeNull();
      expect(screen.queryByTestId("route-details-image")).not.toBeNull();
    });
  });
});

describe("The buttons function the way they should", () => {
  test("delete button executes the function passed as a parameter", () => {
    let mock = jest.fn();
    let deleteButton = screen.queryByTestId("route-details-button-delete");
    rerenderFunc(<RouteDetails deleteRoute={mock}></RouteDetails>);
    waitForElement(() => {
      fireEvent.click(deleteButton);
      expect(mock).toBeCalled();
    });
  });
});
