import React from "react";
import { render, fireEvent, queryByTestId, wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ShareRoute } from "../ShareRoute";
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

let shareRoute;
let modalOpen;
let modalShare;
let modalClose;
let rerenderFunc = () => {};
let onOpen = jest.fn();
let onClose = jest.fn();
let onSave = jest.fn();
beforeEach(() => {
  const { container, rerender } = render(
    <ShareRoute
      selectedRoute={selectedRoute}
      friends={[inigo, cesar]}
      sharedWith={[]}
      onOpen={onOpen}
      onClose={onClose}
      onSave={onSave}
    ></ShareRoute>
  );
  shareRoute = container;
  rerenderFunc = rerender;
  modalOpen = queryByTestId(shareRoute, "modalButton");
  modalShare = queryByTestId(shareRoute, "modalSaveButton");
  modalClose = queryByTestId(shareRoute, "modalCancelButton");
  userEvent.click(modalOpen);
});

describe("Everything renders correctly", () => {
  test("modal opens up", () => {
    wait(() => {
      expect(
        queryByTestId(shareRoute, "share-route-friend-list")
      ).toBeInTheDocument();
    });
  });

  test("onOpen function is executed", () => {
    wait(() => {
      expect(onOpen).toBeCalled();
    });
  });

  test("onClose function is executed", () => {
    wait(() => {
      userEvent.click(modalClose);
      expect(onClose).toBeCalled();
    });
  });

  test("modal components are rendered", () => {
    wait(() => {
      expect(
        queryByTestId(shareRoute, "modalCancelButton")
      ).toBeInTheDocument();
      expect(queryByTestId(shareRoute, "modalSaveButton")).toBeInTheDocument();
      expect(queryByTestId(shareRoute, "modalTitle")).toBeInTheDocument();
    });
  });
});

describe("Behaviour testing", () => {
  test("Friends are selected correctly", () => {
    wait(() => {
      expect(
        queryByTestId(shareRoute, "share-route-share-button-plain")
      ).toBeInTheDocument();
      userEvent.click(queryByTestId(shareRoute, "card0"));
      expect(
        queryByTestId(shareRoute, "share-route-share-button-numbers")
      ).toBeInTheDocument();
      expect(
        queryByTestId(shareRoute, "share-route-share-button-plain")
      ).not.toBeInTheDocument();
      expect(
        queryByTestId(shareRoute, "share-route-share-button-number").textContent
      ).toBe(1);
      userEvent.click(queryByTestId(shareRoute, "card0"));
      expect(
        queryByTestId(shareRoute, "share-route-share-button-plain")
      ).toBeInTheDocument();
      expect(
        queryByTestId(shareRoute, "share-route-share-button-numbers")
      ).not.toBeInTheDocument();
    });
  });

  test("onSave function is executed", () => {
    wait(() => {
      userEvent.click(queryByTestId(shareRoute, "card0"));
      expect(
        queryByTestId(shareRoute, "share-route-share-button-numbers")
      ).toBeInTheDocument();
      userEvent.click(modalShare);
      expect(onSave).toBeCalled();
    });
  });
  test("complex interactions are well handled", () => {
    wait(() => {
      userEvent.click(queryByTestId(shareRoute, "card0"));
      expect(
        queryByTestId(shareRoute, "share-route-share-button-numbers")
      ).toBeInTheDocument();
      userEvent.click(modalShare);
      expect(onSave).toBeCalled();
      userEvent.click(modalOpen);
      expect(queryByTestId(shareRoute, "card0")).not.toBeInTheDocument();
      expect(queryByTestId(shareRoute, "card1")).toBeInTheDocument();

      rerenderFunc(
        <ShareRoute
          selectedRoute={selectedRoute2}
          friends={[inigo, cesar]}
          sharedWith={[]}
          onOpen={onOpen}
          onClose={onClose}
          onSave={onSave}
        ></ShareRoute>
      );
      wait(() => {
        expect(queryByTestId(shareRoute, "card0")).toBeInTheDocument();
        expect(queryByTestId(shareRoute, "card1")).toBeInTheDocument();
      });
    });
  });
});
