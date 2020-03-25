import React from "react";
import {
  render,
  queryByText,
  queryByPlaceholderText,
  waitForDomChange,
  fireEvent
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { UploadRoute } from "../UploadRoute";

let uploadRoute = null;
let rerenderFunc = () => {};

beforeEach(() => {
  const { container, rerender } = render(
    <UploadRoute uploadRoute={route => {}}></UploadRoute>
  );
  uploadRoute = container;
  rerenderFunc = rerender;
});

describe("Renders correctly", () => {
  test("All labels are rendered", () => {
    let nameLabel = queryByText(uploadRoute, "Name of the route");
    let descriptionLabel = queryByText(uploadRoute, "Description");
    let positionsLabel = queryByText(uploadRoute, "Positions");
    expect(nameLabel).toBeInTheDocument();
    expect(descriptionLabel).toBeInTheDocument();
    expect(positionsLabel).toBeInTheDocument();
  });

  test("all inputs are rendered", () => {
    let nameInput = queryByPlaceholderText(uploadRoute, "Route name");
    let descriptionInput = queryByPlaceholderText(
      uploadRoute,
      "Description..."
    );
    let positionsInput = queryByPlaceholderText(
      uploadRoute,
      "Positions, as of now in javascript array[n,2] format, example: [[10.148, -5.148], [11.134, 4.0459]]"
    );
    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(positionsInput).toBeInTheDocument();
  });
  test("submit button is rendered", () => {
    let submitButton = queryByText(uploadRoute, "Submit");
    expect(submitButton).toBeInTheDocument();
  });
});

describe("Behaviour", () => {
  test("all inputs are cleared after submit", () => {
    let nameInput = queryByPlaceholderText(uploadRoute, "Route name");
    let submitButton = queryByText(uploadRoute, "Submit");
    let descriptionInput = queryByPlaceholderText(
      uploadRoute,
      "Description..."
    );
    let positionsInput = queryByPlaceholderText(
      uploadRoute,
      "Positions, as of now in javascript array[n,2] format, example: [[10.148, -5.148], [11.134, 4.0459]]"
    );
    expect(nameInput).toBeEmpty();
    expect(descriptionInput).toBeEmpty();
    expect(positionsInput).toBeEmpty();

    fireEvent.change(nameInput, { target: { value: "mock" } });
    fireEvent.change(descriptionInput, { target: { value: "mock" } });
    fireEvent.change(positionsInput, { target: { value: "mock" } });

    expect(nameInput.value).toBe("mock");
    expect(descriptionInput.value).toBe("mock");
    expect(positionsInput.value).toBe("mock");

    submitButton.click();
    waitForDomChange(() => {
      expect(nameInput).toBeEmpty();
      expect(descriptionInput).toBeEmpty();
      expect(positionsInput).toBeEmpty();
    });
  });

  test("submit function is triggered when the form is submitted", () => {
    const spy = jest.spyOn(UploadRoute.prototype, "submitForm");
    const mockFunc = jest.fn();
    rerenderFunc(<UploadRoute uploadRoute={mockFunc}></UploadRoute>);
    let submitButton = queryByText(uploadRoute, "Submit");
    expect(spy).not.toBeCalled();
    submitButton.click();
    waitForDomChange(() => {
      expect(mockFunc).toBeCalled();
    });
  });

  test("function handling the information of the route is fired", () => {
    const spy = jest.spyOn(UploadRoute.prototype, "changeHandlerRoute");
    const mockFunc = jest.fn();

    let nameInput = queryByPlaceholderText(uploadRoute, "Route name");
    let positionsInput = queryByPlaceholderText(
      uploadRoute,
      "Positions, as of now in javascript array[n,2] format, example: [[10.148, -5.148], [11.134, 4.0459]]"
    );
    let descriptionInput = queryByPlaceholderText(
      uploadRoute,
      "Description..."
    );
    rerenderFunc(<UploadRoute uploadRoute={mockFunc}></UploadRoute>);

    expect(spy).not.toBeCalled();

    fireEvent.change(nameInput, { target: { value: "mock" } });
    expect(spy).toBeCalled();
    fireEvent.change(descriptionInput, { target: { value: "mock" } });
    expect(spy).toBeCalled();
    fireEvent.change(positionsInput, { target: { value: "mock" } });
    expect(spy).toBeCalled();
  });
});
