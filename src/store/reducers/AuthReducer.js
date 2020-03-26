const initState = {
  userWebId: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
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
