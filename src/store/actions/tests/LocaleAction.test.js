import { testStore } from "../../../utils";
import localeReducer from "../../reducers/LocaleReducer";
import changeLocale from "../localeAction";

describe("Locale actions", () => {

    test("change locales action", () => {
        const store = testStore(localeReducer, undefined);

        const expectedState = {
            locale: "es"
        };
        store.dispatch(changeLocale("es"));
        expect(store.getState()).toEqual(expectedState);
    });

});