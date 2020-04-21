export const deepClone = array => {
  let aux = array.map(item => ({ ...item }));
  return aux;
};

export const filterUnsharedFriends = (allFriends, alreadyShared) => {
  let aux = [];
  let hash = {};
  if (alreadyShared.length === 0) return allFriends;
  //Initialize the hash table
  alreadyShared.map(friend => hash[friend.uri] = true);
  allFriends.map(friend => {
    if (!findInHashByUri(hash, friend)) return aux.push({ ...friend });
    return [];
  });
  return aux;
};

const findInHashByUri = (hash, friend) => {
  return hash[friend.uri];
};

export const getRouteUri = (routeID) => {
  
};
