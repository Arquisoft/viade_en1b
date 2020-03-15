
export const createRoute = (route) => {
    return (dispatch, getState) => {
        //make async code
        dispatch({
            type: 'CREATE_ROUTE',
            route: route
        })
    }
}

export const deleteRoute = () => {
    return (dispatch, getState) => {

        const r = getState().route.routes
        r.splice(getState().route.selectedRoute.id, 1)
        getState().route.routes = r
        alert("Has borrado la ruta")
        getState().route.selectedRoute = r[0]
        dispatch({
            type: 'DELETE_ROUTE',
            r
        })
    }
}

export const showRoute = (route) => {
    return (dispatch, getState) => {
        getState().route.selectedRoute = route
        console.log(getState())
        dispatch({
            type: 'SHOW_ROUTE',
            route
        })
    }
}

export const uploadRoute = (route) => {
    return (dispatch, getState) => {
        const newRoute = {
            id: Object.keys(getState().route.routes).length,
            name: route.name,
            description: route.description,
            author: 'alvaro', //we need to change this,
            positions: route.file,
            images: route.images,
            videos: route.videos
        }
        getState().route.routes[getState().route.routes.length]=newRoute
        console.log(getState())
        dispatch({
            type: 'UPLOAD_ROUTE',
            newRoute
        })
    }
}