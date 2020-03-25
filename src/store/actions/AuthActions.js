export const logIn = userWebId => {
  return (dispatch, getState) => {
    dispatch({
      type: "LOG_IN",
      payload: userWebId
    });
  };
};

export const logOut = () => {
  return (dispatch, getState) => {
    //make async code
    getState().auth.userWebId = null;
    dispatch({
      type: "LOG_OUT"
    });
  };
};

export const updateWebId = webId => {
  return {
    type: "UPDATE_WEB_ID",
    payload: webId
  };
};
