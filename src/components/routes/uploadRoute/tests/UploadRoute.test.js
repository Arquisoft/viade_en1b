import React from "react";
import {
  render,
  queryByText,
  queryByPlaceholderText,
  waitForDomChange,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { UploadRoute } from "../UploadRoute";
import { locales } from "../../../../utils/locales";
import { IntlProvider } from "react-intl";

let uploadRoute = null;
let rerenderFunc = () => {};

beforeEach(() => {
  const { container, rerender } = render(
    <IntlProvider key={"en"} locale={"en"} messages={locales["en"]}>
      <UploadRoute
        routes={[]}
        uploadRoute={(route) => {}}
        loadRoutes={() => {}}
      ></UploadRoute>
    </IntlProvider>
  );
  uploadRoute = container;
  rerenderFunc = rerender;
});

describe("Renders correctly", () => {
  test("All labels are rendered", () => {
    let nameLabel = queryByText(uploadRoute, "Name of the route");
    let descriptionLabel = queryByText(uploadRoute, "Description");
    expect(nameLabel).toBeInTheDocument();
    expect(descriptionLabel).toBeInTheDocument();
  });

  test("all inputs are rendered", () => {
    let nameInput = queryByPlaceholderText(uploadRoute, "Route name");
    let descriptionInput = queryByPlaceholderText(
      uploadRoute,
      "Add a description"
    );
    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
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
      "Add a description"
    );

    expect(nameInput).toBeEmpty();
    expect(descriptionInput).toBeEmpty();

    fireEvent.change(nameInput, { target: { value: "mock" } });
    fireEvent.change(descriptionInput, { target: { value: "mock" } });

    expect(nameInput.value).toBe("mock");
    expect(descriptionInput.value).toBe("mock");

    submitButton.click();
    waitForDomChange(() => {
      expect(nameInput).toBeEmpty();
      expect(descriptionInput).toBeEmpty();
    });
  });

  test("submit function is triggered when the form is submitted", () => {
    const spy = jest.spyOn(UploadRoute.prototype, "submitForm");
    const mockFunc = jest.fn();
    rerenderFunc(
      <IntlProvider key={"en"} locale={"en"} messages={locales["en"]}>
        <UploadRoute
          routes={[]}
          uploadRoute={mockFunc}
          loadRoutes={mockFunc}
        ></UploadRoute>
      </IntlProvider>
    );
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
    let descriptionInput = queryByPlaceholderText(
      uploadRoute,
      "Add a description"
    );
    rerenderFunc(
      <IntlProvider key={"en"} locale={"en"} messages={locales["en"]}>
        <UploadRoute
          routes={[]}
          uploadRoute={mockFunc}
          loadRoutes={mockFunc}
        ></UploadRoute>
      </IntlProvider>
    );

    expect(spy).not.toBeCalled();

    fireEvent.change(nameInput, { target: { value: "mock" } });
    expect(spy).toBeCalled();
    fireEvent.change(descriptionInput, { target: { value: "mock" } });
    expect(spy).toBeCalled();
  });
});
