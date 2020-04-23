import loadReducer from "../LoadReducer";

describe("Load reducer", () => {

    const initState = {
        loaded: false
    };

    const action = {
        type: "LOAD",
        payload: true
    };

    test("Should return default state", () => {
        const newState = loadReducer(undefined, {});
        expect(newState).toEqual(initState);
    });

    describe("should return if receiving type", () => {
        test("type LOAD", () => {
            const newState = loadReducer(undefined, action);
            expect(newState).toEqual({loaded: true});
        });
    });
});