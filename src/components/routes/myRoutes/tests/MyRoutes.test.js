import React from "react";
import { render } from "@testing-library/react";
import { MyRoutes } from "../MyRoutes";
const myRoutes = null;
beforeEach(() => {
  const { container, rerender } = render(<MyRoutes></MyRoutes>);
});

describe("Everything is rendered correctly", () => {
  test("routes are rendered", () => {});
});
