/**
 * Returns the hash of a friend
 * @param  {*} hash
 * @param  {*} friend
 */
const findInHashByUri = (hash, friend) => {
  return hash[friend];
};

/**
 * Creates a real copy of an array
 * @param  {*} array
 */
export const deepClone = (array) => {
  let aux = array.map((item) => ({ ...item }));
  return aux;
};


/**
 * Filter unshared friends
 * @param  {*} allFriends
 * @param  {*} alreadyShared
 */
export const filterUnsharedFriends = (allFriends, alreadyShared) => {
  let aux = [];
  let hash = {};
  if (alreadyShared.length === 0) {
    return allFriends;
  }
  //Initialize the hash table
  alreadyShared.map((friend) => (hash[friend] = true));
  allFriends.map((friend) => {
    if (!findInHashByUri(hash, friend.uri)) {
      return aux.push({ ...friend });
    }
    return [];
  });

  return aux;
};

/**
 * Get the number of routes of the user that is logged in
 * @param {*} routes
 * @param {*} userWebID user logged in id
 */
export const getOwnRoutesNumber = (routes, userWebID) => {
  return routes.filter(
    (route) => route.author === userWebID.split("//")[1].split("/")[0]
  ).length;
};

/**
 * Get the number of routes that the user that is logged in has shared
 * @param {*} routes
 * @param {*} userWebId  user logged in id
 */
export const getSharedRoutesNumber = (routes, userWebId) => {
  return routes.length - getOwnRoutesNumber(routes, userWebId);
};
