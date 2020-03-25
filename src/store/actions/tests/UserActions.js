import { getEmail } from "../../../solid/profileInfo";
export const showProfile = webId => {
  return {
    type: "SHOW_PROFILE",
    payload: webId
  };
};
