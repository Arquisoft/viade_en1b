import { getEmail } from "../solid/profileInfo";
import { getFriends, getName } from "rdf-query/rdf-query";
import {
  loadEmailError,
  loadEmailSuccess,
  loadFriendsSuccess
} from "../store/actions/UserActions";
import { getRoutesFromPod } from "../solid/routes";
import {
  loadRoutesSuccess,
  loadRoutesError
} from "../store/actions/RouteActions";

export const myLogger = (store) => (next) => (action) => {
  console.groupCollapsed(action.type);
  console.log("PAYLOAD: ", action.payload);
  console.log("previous state", store.getState());
  next(action);
  console.log("actual state", store.getState());
  console.groupEnd();
};
export const asyncRouteFetch = (store) => (next) => (action) => {
  switch (action.type) {
    case "LOAD_ROUTES_REQUEST":
      let webId = store.getState().auth.userWebId;
      if (webId) {
        getRoutesFromPod(webId)
          .then((routes) => {
            store.dispatch(loadRoutesSuccess(routes));
          })
          .catch((error) => {
            store.dispatch(loadRoutesError(error));
          });
      }
      break;
    default:
      break;
  }
  next(action);
};

export const asyncProfileFetch = (store) => (next) => (action) => {
  switch (action.type) {
    case "LOAD_EMAIL_REQUEST":
      getEmail()
        .then((email) => {
          store.dispatch(loadEmailSuccess(email));
        })
        .catch((error) => store.dispatch(loadEmailError(error.message)));
      break;
    case "LOAD_FRIENDS_REQUEST":
      let webId = store.getState().auth.userWebId;
      if (webId)
        getFriends(webId)
          .then((response) => {
            let friendsUri = [...response].map((friend) => friend.object.value);
            let friendsNames = [...friendsUri];
            friendsNames = friendsNames.map((webId) => {
              return getName(webId);
            });
            Promise.all(friendsNames).then((results) => {
              let friendsObjects = [];
              friendsNames = results.map((literal) =>
                literal === null ? "noName" : literal.value
              );
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
          .catch((error) => console.error(error));
      break;
    default:
      break;
  }
  next(action);
};
