export const profileReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_PROFILE":
      state.getState().profile = action.payload;
  }
};
