const initState = {
    routes : [
        { id: 0, name: "Hiking Naranco ", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]] },
        { id: 1, name: "Hiking Ruta de las Xanas", author: "Marcos", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]] },
        { id: 2, name: "Senda del Oso", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]] },
        { id: 3, name: "Hiking Naranco", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]] },
        { id: 4, name: "Senda del Oso", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]] },
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
        default:
            return state
    }
}
export default routeReducer