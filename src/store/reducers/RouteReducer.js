const initState = {
    routes : [
        { id: 0, name: "Hiking Naranco ", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: 'A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing', images: ["https://source.unsplash.com/random/600x600", "https://source.unsplash.com/random/602x602"], videos: ["futuro video 1", "futuro video 2"] },
        { id: 1, name: "Hiking Ruta de las Xanas", author: "Marcos", positions: [[43.360383711, -5.850],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: '', images: [], videos: [] },
        { id: 2, name: "Senda del Oso", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: '', images: [], videos: [] },
        { id: 3, name: "Hiking Naranco", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: '', images: [], videos: [] },
        { id: 4, name: "Senda del Oso", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: '', images: [], videos: [] },
    ],
    selectedRoute: null
}

const routeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_ROUTE':
            console.log("routed shown", action.route)
            console.log(state)
            return {...state}
        case 'UPLOAD_ROUTE':
            console.log("routed uploaded", action.newRoute)
            console.log(state)
            return {...state}
        case 'DELETE_ROUTE':
            console.log("routed deleted", action.route)
            console.log(state)
            return {...state}
        case 'SHARE_ROUTE':
            console.log("routed shared", action.route)
            console.log(state)
            return {...state}
        default:
            return state
    }
}
export default routeReducer