export const loadEmailRequest = () => {
  return {
    type: "LOAD_EMAIL_REQUEST",
    payload: true
  };
};

export const loadEmailSuccess = email => {
  return {
    type: "LOAD_EMAIL_SUCCESS",
    payload: email
  };
};

export const loadEmailError = error => {
  return {
    type: "LOAD_EMAIL_ERROR",
    payload: error
  };
};

export const loadFriendsRequest = () => {
  return {
    type: "LOAD_FRIENDS_REQUEST",
    payload: true
  };
};

export const loadFriendsSuccess = friends => {
  return {
    type: "LOAD_FRIENDS_SUCCESS",
    payload: friends
  };
};

export const loadFriendsError = error => {
  return {
    type: "LOAD_FRIENDS_ERROR",
    payload: error
  };
};
