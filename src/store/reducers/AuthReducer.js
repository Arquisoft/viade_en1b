const initState = {
  userWebId: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        userWebId: action.payload
      };
    case "LOG_OUT":
      return { ...state };
    case "UPDATE_WEB_ID":
      return {
        ...state,
        userWebId: action.payload
      };
    default:
      return state;
  }
};
export default authReducer;
