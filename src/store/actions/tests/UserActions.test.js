import { testStore } from "../../../utils/index";
import {
  loadEmailError, loadEmailRequest, loadEmailSuccess, loadFriendsError, loadFriendsRequest, loadFriendsSuccess
} from "../UserActions";
import rootReducer from "../../reducers/RootReducer";

describe("Route actions", () => {

  const initState = {
    route: {},
    auth: {},
    user: {
      email: null,
      emailLoading: false,
      emailError: null,
      friends: [],
      friendsLoading: false,
      friendsError: null
    }
  };

  const mockPayload = "mock";

  test("load email error action", () => {
    const expectedState = {
      email: null,
      emailLoading: false,
      emailError: mockPayload,
      friends: [],
      friendsLoading: false,
      friendsError: null
    };
    const store = testStore(rootReducer, initState);

    store.dispatch(loadEmailError(mockPayload));
    const newState = store.getState().user;

    expect(newState).toStrictEqual(expectedState);
  });

  test("load email request action", () => {
    const expectedState = {
      email: null,
      emailLoading: true,
      emailError: null,
      friends: [],
      friendsLoading: false,
      friendsError: null
    };

    const store = testStore(rootReducer, initState);

    store.dispatch(loadEmailRequest());
    const newState = store.getState().user;

    expect(newState).toStrictEqual(expectedState);
  });

  test("load email success action", () => {
    const expectedState = {
      email: mockPayload,
      emailLoading: false,
      emailError: null,
      friends: [],
      friendsLoading: false,
      friendsError: null
    };
    const store = testStore(rootReducer, initState);

    store.dispatch(loadEmailSuccess(mockPayload));
    const newState = store.getState().user;

    expect(newState).toStrictEqual(expectedState);
  });

  test("load friends request action", () => {
    const expectedState = {
      email: null,
      emailLoading: false,
      emailError: null,
      friends: [],
      friendsLoading: true,
      friendsError: null
    };
    const store = testStore(rootReducer, initState);

    store.dispatch(loadFriendsRequest());
    const newState = store.getState().user;

    expect(newState).toStrictEqual(expectedState);
  });

  test("load friends success action", () => {
    const expectedState = {
      email: null,
      emailLoading: false,
      emailError: null,
      friends: mockPayload,
      friendsLoading: false,
      friendsError: null
    };
    const store = testStore(rootReducer, initState);

    store.dispatch(loadFriendsSuccess(mockPayload));
    const newState = store.getState().user;

    expect(newState).toStrictEqual(expectedState);
  });

  test("load friends error action", () => {
    const expectedState = {
      email: null,
      emailLoading: false,
      emailError: null,
      friends: [],
      friendsLoading: false,
      friendsError: mockPayload
    };
    const store = testStore(rootReducer, initState);

    store.dispatch(loadFriendsError(mockPayload));
    const newState = store.getState().user;

    expect(newState).toStrictEqual(expectedState);
  });
});
