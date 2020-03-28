import {
  render,
  queryByTestId
} from "@testing-library/react";
import App from "../App.js";
import React from "react";

let wrapper;
beforeEach(() => {
  const { container } = render(<App />);
  wrapper = container;
});

describe("App Component", () => {
  test("Component renders correctly", () => {
    expect(queryByTestId(wrapper, "theApp")).not.toBeNull();
    expect(queryByTestId(wrapper, "theNavBar")).toBeNull();
  });
});
