const initialState = {
  email: null,
  emailLoading: false,
  emailError: null,
  friends: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_EMAIL_REQUEST":
      return {
        ...state,
        loading: action.payload
      };
    case "LOAD_EMAIL_ERROR":
      return {
        ...state,
        emailError: action.payload
      };
    case "LOAD_EMAIL_SUCCESS":
      return {
        ...state,
        loading: false,
        email: action.payload
      };
    case "LOAD_FRIENDS_REQUEST":
      return {
        ...state,
        loading: action.payload
      };
    case "LOAD_FRIENDS_SUCCESS":
      return {
        ...state,
        loading: false,
        friends: action.payload
      };
    case "LOAD_FRIENDS_ERROR":
      return {
        ...state,
        loading: false,
        friendsError: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
