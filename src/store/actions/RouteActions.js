export const createRoute = (route) =>{
    return (dispatch, getState) =>{
        //make async code
        dispatch({
            type: 'CREATE_ROUTE',
            route: route
        })
    }
}

export const showRoute = (route) =>{
    return (dispatch, getState) =>{
        getState().route.selectedRoute = route
        console.log(getState())
        dispatch({
            type: 'SHOW_ROUTE',
            route
        })
    }
}