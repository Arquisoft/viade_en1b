const initState = {
    routes : [
        { id: 0, name: "Hiking Naranco ", author: "César" },
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