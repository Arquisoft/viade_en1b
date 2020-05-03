export function getRoute0() {
  return { id: 0, name: "Hiking Naranco", author: "César", positions: [[43.360383711, -5.840650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing", images: ["https://source.unsplash.com/random/600x600", "https://source.unsplash.com/random/602x602"], videos: ["futuro video 1", "futuro video 2"], sharedWith: [] }
}

export function getRoute1() {
  return { id: 1, name: "Hiking Ruta de las Xanas", author: "Marcos", positions: [[43.360383711, -5.840650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "", images: [], videos: [], sharedWith: [] };
}

export function getRoute2() {
  return { id: 2, name: "Senda del Oso", author: "César", positions: [[43.360383711, -5.840650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "", images: [], videos: [], sharedWith: [] };
}

export function getRoute3() {
  let route = getRoute0();
  route.id = 3;
  route.description = "";
  route.images = [];
  route.videos = [];
  return route;
}

export function getRoute4() {
  let route =  getRoute2();
  route.id = 4;
  return route;
}
