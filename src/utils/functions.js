export const deepClone = array => {
  let aux = array.map(item => ({ ...item }));
  return aux;
};
