export const myLogger = store => next => action => {
  console.group(action.type);
  console.log("previous state", store.getState());
  next(action);
  console.log("actual state", store.getState());
  console.groupEnd();
};
export const asyncRouteFetch = store => next => action => {
  if (action.type) {
    console.log(store.getState().route.selectedRoute);
  }
  next(action);
};
