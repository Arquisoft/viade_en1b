
const findInHashByUri = (hash, friend) => {
  return hash[friend];
};

export const deepClone = (array) => {
  let aux = array.map((item) => ({ ...item }));
  return aux;
};

export const filterUnsharedFriends = (allFriends, alreadyShared) => {
  let aux = [];
  let hash = {};
  if (alreadyShared.length === 0) {return allFriends;}
  //Initialize the hash table
  alreadyShared.map((friend) => (hash[friend] = true));
  allFriends.map((friend) => {
    if (!findInHashByUri(hash, friend.uri)) {return aux.push({ ...friend });}
    return [];
  });

  return aux;
};

/**
 * 
 * @param {*} routes 
 * @param {*} userWebID user logged in id
 */
export const getOwnRoutesNumber = (routes, userWebID) => {
  console.log(routes, userWebID);
  return routes.filter((route) => route.author === userWebID.split("//")[1].split(".")[0]).length;
};

/**
 * 
 * @param {*} routes 
 * @param {*} userWebId  user logged in id
 */
export const getSharedRoutesNumber = (routes, userWebId) => {
  return routes.length - getOwnRoutesNumber(routes, userWebId);
};
