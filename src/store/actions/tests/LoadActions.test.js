import loadReducer from "../../reducers/LoadReducer";
import { contentLoaded } from "../LoadActions";
import { testStore } from "../../../utils";

describe("Load actions", () => {

    test("content loaded action", () => {
        const store = testStore(loadReducer, undefined);

        const expectedState = {
            loaded: true
        };
        store.dispatch(contentLoaded());
        expect(store.getState()).toEqual(expectedState);
    });

});