import {
  render,
  queryByTestId,
  fireEvent,
  waitForDomChange,
} from "@testing-library/react";
import Settings from "../Settings";
import React from "react";

let wrapper;
let myMockTheme;
let myMockLanguage;
beforeEach(() => {
  const mockTheme = jest.fn();
  const mockLanguage = jest.fn();
  const { container, rerender } = render(
    <Settings changeTheme={mockTheme} changeLanguage={mockLanguage}></Settings>
  );
  wrapper = container;
  myMockTheme = mockTheme;
  myMockLanguage = mockLanguage;
});

describe("Settings Component", () => {
  test("Component renders correctly", () => {
    expect(queryByTestId(wrapper, "settings-title")).not.toBeNull();
    expect(queryByTestId(wrapper, "settings-language")).not.toBeNull();
    expect(queryByTestId(wrapper, "settings-language-english")).toBeNull();
    expect(queryByTestId(wrapper, "settings-language-spanish")).toBeNull();
    expect(queryByTestId(wrapper, "settings-language-dropdown")).not.toBeNull();
  });

  beforeEach(() => {
    let dropdown = queryByTestId(wrapper, "settings-language-dropdown");
    fireEvent.click(dropdown);
  });

  describe("Change theme function", () => {
    test("english", () => {
      waitForDomChange(() => {
        let language = queryByTestId(wrapper, "settings-language-english");
        expect(language).not.toBeNull();
        fireEvent.click(language);
        expect(myMockLanguage).toBeCalled();
      });
    });

    test("spanish", () => {
      waitForDomChange(() => {
        let language = queryByTestId(wrapper, "settings-language-spanish");
        expect(language).not.toBeNull();
        fireEvent.click(language);
        expect(myMockLanguage).toBeCalled();
      });
    });
  });
});
