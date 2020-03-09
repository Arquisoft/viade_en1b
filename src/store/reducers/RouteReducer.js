const initState = {
    routes : [
        { id: 0, name: "Hiking Naranco ", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]] },
        { id: 1, name: "Hiking Ruta de las Xanas", author: "Marcos" },
        { id: 2, name: "Senda del Oso", author: "César" },
        { id: 3, name: "Hiking Naranco", author: "César" },
        { id: 4, name: "Senda del Oso", author: "César" },
        { id: 5, name: "Ruta de las Xanas", author: "Raúl" },
        { id: 6, name: "Pista Finaldesa", author: "Marcos" },
        { id: 7, name: "Hiking Naranco ", author: "César" },
        { id: 8, name: "Hiking Ruta de las Xanas", author: "Marcos" },
        { id: 9, name: "Senda del Oso", author: "César" },
        { id: 10, name: "Hiking Naranco", author: "César" },
        { id: 11, name: "Senda del Oso", author: "César" },
        { id: 12, name: "Ruta de las Xanas", author: "Raúl" },
        { id: 13, name: "Pista Finaldesa", author: "Marcos" },
    ],
    selectedRoute: null
}

const routeReducer = (state = initState, action) => {
    switch(action.type){
        case 'SHOW_ROUTE':
            console.log("routed shown", action.route)
            return {...state}
        default:
            return state
    }
}
export default routeReducer