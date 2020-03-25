import { getEmail } from "../../solid/profileInfo";
export const profileReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_PROFILE":
      getEmail().then(response => {
        return {
          ...state,
          email: response
        };
      });
  }
};
