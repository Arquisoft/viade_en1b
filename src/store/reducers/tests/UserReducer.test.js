import userReducer from "../UserReducer";
import "@testing-library/jest-dom";

describe("User Reducer", () => {

    const initState = {
        email: null,
        emailLoading: false,
        emailError: null,
        friends: [],
        friendsLoading: false,
        friendsError: null
    };

    test("Should return default state", () => {
        const newState = userReducer(undefined, {});
        expect(newState).toEqual(initState);
    });

    describe("Should return state if receiving type", () => {

        const mockPayload = "mock";

        test("Type SHOW_ROUTE", () => {
            const newState = userReducer(initState, {
                type: "LOAD_EMAIL_REQUEST",
                payload: mockPayload
            });
            const expected = {
                ...initState,
                emailLoading: mockPayload
            };
            expect(newState).toEqual(expected);
        });

        test("Type LOAD_EMAIL_ERROR", () => {
            const newState = userReducer(initState, {
                type: "LOAD_EMAIL_ERROR",
                payload: mockPayload
            });
            const expected = {
                ...initState,
                emailError: mockPayload
            }
            expect(newState).toEqual(expected);
        });

        test("Type LOAD_EMAIL_SUCCESS", () => {
            const newState = userReducer(initState, {
                type: "LOAD_EMAIL_SUCCESS",
                payload: mockPayload
            });
            const expected = {
                ...initState, 
                emailLoading: false,
                email: mockPayload
            };
            expect(newState).toEqual(expected);
        });

        test("Type LOAD_FRIENDS_REQUEST", () => {
            const newState = userReducer(initState, {
                type: "LOAD_FRIENDS_REQUEST",
                payload: mockPayload
            });
            const expected = { 
                ...initState, 
                friendsLoading: mockPayload
             };
            expect(newState).toEqual(expected);
        });

        test("Type LOAD_FRIENDS_SUCCESS", () => {
            const newState = userReducer(initState, {
                type: "LOAD_FRIENDS_SUCCESS",
                payload: mockPayload
            });
            const expected = { 
                ...initState, 
                friendsLoading: false,
                friends: mockPayload
             };
            expect(newState).toEqual(expected);
        });

        test("Type LOAD_FRIENDS_ERROR", () => {
            const newState = userReducer(initState, {
                type: "LOAD_FRIENDS_ERROR",
                payload: mockPayload
            });
            const expected = { 
                ...initState, 
                friendsLoading: false,
                friendsError: mockPayload
             };
            expect(newState).toEqual(expected);
        });

    });
});