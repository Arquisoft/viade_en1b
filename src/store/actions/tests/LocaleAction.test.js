import { testStore } from "../../../utils";
import localeReducer from "../../reducers/LocaleReducer";
import changeLocale from "../localeAction";

describe("Locale actions", () => {
  test("change locales action", () => {
    const store = testStore(localeReducer, undefined);

    const expectedState = {
      id: "Spanish",
      text: "Spanish",
      locale: "es",
    };
    store.dispatch(
      changeLocale({ id: "Spanish", text: "Spanish", locale: "es" })
    );
    expect(store.getState()).toEqual(expectedState);
  });
});
