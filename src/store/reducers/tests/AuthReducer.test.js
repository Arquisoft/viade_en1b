import authReducer from "../AuthReducer";
import "@testing-library/jest-dom";

describe("Auth Reducer", () => {


    const initState = {
        userWebId: null
    };
   
    test("Should return default state", () => {
        const newState = authReducer(undefined, {});
        expect(newState).toEqual(initState);
    });

    describe("Should return state if receiving type", () =>{
        const id = "testId";

        test("Type UPDATE_WEB_ID", () => {
            const newState = authReducer(initState, {
                type : "UPDATE_WEB_ID",
                payload: id,
            });
            const expected = {...initState, userWebId:id};
            expect(newState).toEqual(expected);
        });
        
    });
});