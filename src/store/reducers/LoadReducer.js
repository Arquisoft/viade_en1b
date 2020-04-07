const initState = {
  loaded: false
};

export const loadReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD":
      return {
        ...state,
        loaded: action.payload
      };
    default:
      return state;
  }
};
export default loadReducer;
