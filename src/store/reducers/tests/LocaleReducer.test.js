import localeReducer from "../LocaleReducer";

describe("Locale reducer", () => {
  const initState = {
    id: "English",
    text: "English",
    locale: "en",
  };

  let action = {
    type: "CHANGE_LOCALE_LANGUAGE_SUCCESS",
    payload: { id: "Spanish", text: "Spanish", locale: "es" },
  };

  const modified = { id: "Spanish", text: "Spanish", locale: "es" };

  test("Should return default state", () => {
    const newState = localeReducer(undefined, {});
    expect(newState).toEqual(initState);
  });

  describe("Should return state if receiving type", () => {
    test("type CHANGE_LOCALE_LANGUAGE_SUCCESS", () => {
      const newState = localeReducer(undefined, action);
      expect(newState).toEqual(modified);
    });
  });
});
