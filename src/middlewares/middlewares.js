import { getEmail } from "../solid/profileInfo";
import { getFriends } from "rdf-query/rdf-query";
import {
  showProfileError,
  showProfileSuccess,
  loadFriendsSuccess
} from "../store/actions/UserActions";

export const myLogger = store => next => action => {
  console.groupCollapsed(action.type);
  console.log("previous state", store.getState());
  next(action);
  console.log("actual state", store.getState());
  console.groupEnd();
};
export const asyncRouteFetch = store => next => action => {
  next(action);
};

export const asyncProfileFetch = store => next => action => {
  switch (action.type) {
    case "SHOW_PROFILE_REQUEST":
      getEmail()
        .then(email => {
          store.dispatch(showProfileSuccess(email));
        })
        .catch(error => store.dispatch(showProfileError(error.message)));
      break;
    case "LOAD_FRIENDS_REQUEST":
      let webId = store.getState().auth.userWebId;
      if (webId)
        getFriends(webId)
          .then(response => {
            let friends = response.map(friend => friend.object.value);
            store.dispatch(loadFriendsSuccess(friends));
          })
          .catch(error => console.error(error));
      break;
    default:
      break;
  }
  next(action);
};
