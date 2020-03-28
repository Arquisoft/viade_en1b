import { testStore } from "../../../utils/index";
import {
  updateWebId
} from "../AuthActions";
import rootReducer from "../../reducers/RootReducer";

describe("Auth actions", () => {

  const initState = {
    route: {},
    auth: {
      userWebId: null
    },
    user: {}
  };

  const mockPayload = "mock";

  test("update web id action", () => {
    const expectedState = {
      userWebId: mockPayload
    };
    const store = testStore(rootReducer, initState);

    store.dispatch(updateWebId(mockPayload));
    const newState = store.getState().auth;

    expect(newState).toStrictEqual(expectedState);
  });

});
