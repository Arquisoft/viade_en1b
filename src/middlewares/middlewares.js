import { getEmail } from "../solid/profileInfo";
import { getFriends, getName } from "rdf-query/rdf-query";
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
            let friendsUri = [...response].map(friend => friend.object.value);
            let friendsNames = [...friendsUri];
            friendsNames = friendsNames.map(webId => {
              return getName(webId);
            });
            Promise.all(friendsNames).then(results => {
              let friendsObjects = [];
              friendsNames = results.map(literal => literal.value);
              for (let i = 0; i < friendsNames.length; i++) {
                let friend = {
                  name: friendsNames[i],
                  uri: friendsUri[i]
                };
                friendsObjects.push(friend);
              }

              store.dispatch(loadFriendsSuccess(friendsObjects));
            });
          })
          .catch(error => console.error(error));
      break;
    default:
      break;
  }
  next(action);
};
