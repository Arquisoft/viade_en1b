const initialState = {
  email: null,
  emailLoading: false,
  emailError: null,
  friends: [],
  friendsLoading: false,
  friendsError: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_EMAIL_REQUEST":
      return {
        ...state,
        emailLoading: action.payload
      };
    case "LOAD_EMAIL_ERROR":
      return {
        ...state,
        emailError: action.payload
      };
    case "LOAD_EMAIL_SUCCESS":
      return {
        ...state,
        emailLoading: false,
        email: action.payload
      };
    case "LOAD_FRIENDS_REQUEST":
      return {
        ...state,
        friendsLoading: action.payload
      };
    case "LOAD_FRIENDS_SUCCESS":
      return {
        ...state,
        friendsLoading: false,
        friends: action.payload
      };
    case "LOAD_FRIENDS_ERROR":
      return {
        ...state,
        friendsLoading: false,
        friendsError: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
