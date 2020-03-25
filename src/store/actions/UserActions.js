export const showProfileRequest = () => {
  return {
    type: "SHOW_PROFILE_REQUEST",
    payload: true
  };
};

export const showProfileSuccess = email => {
  return {
    type: "SHOW_PROFILE_SUCCESS",
    payload: email
  };
};

export const showProfileError = error => {
  return {
    type: "SHOW_PROFILE_ERROR",
    payload: error
  };
};

export const loadFriendsRequest = () => {
  return {
    type: "LOAD_FRIENDS_REQUEST",
    payload: true
  };
};

export const loadFriendsSuccess = webId => {
  return {
    type: "LOAD_FRIENDS_SUCCESS",
    payload: webId
  };
};

export const loadFriendsError = error => {
  return {
    type: "LOAD_FRIENDS_ERROR",
    payload: error
  };
};
