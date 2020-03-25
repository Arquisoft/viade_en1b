import { getEmail } from "../../../solid/profileInfo";
export const showProfile = () => {
  console.log(dispatch);
  return (dispatch, getState) => {
    getEmail().then(response => {
      dispatch({
        type: "SHOW_PROFILE",
        payload: response
      });
    });
  };
};
