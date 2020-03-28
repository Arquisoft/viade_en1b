import { uploadRouteToPod } from "./../../solid/routes.js";

export const deleteRoute = (route) => {
    return (dispatch, getState) => {
        let routes = getState().route.routes.filter(r => r.id!==route.id);
        getState().route.routes = routes; // actualizar el estado
        getState().route.selectedRoute = null; //deseleccionamos la ruta
        //alert("Has borrado la ruta")
        dispatch({
            type: 'DELETE_ROUTE',
            payload: route
        });
    };
}

export const shareRoute = (route) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SHARE_ROUTE',
            payload: route
        });
    };
}

export const showRoute = (route) => {
    return (dispatch, getState) => {
        getState().route.selectedRoute = route;
        //console.log(getState());
        dispatch({
            type: 'SHOW_ROUTE',
            payload: route
        });
    };
}

export const clearRoute = () => {
    return (dispatch, getState) => {
        getState().route.selectedRoute = null;
        dispatch({
            type: 'CLEAR_ROUTE',
            payload: null
        });
    };
}

export const uploadRoute = (route) => {
    return (dispatch, getState) => {
        const newRoute = {
            name: route.name,
            description: route.description,
            author: route.author,
            positions: route.positions,
            file: route.file,
            images: route.images,
            videos: route.videos
        };
        uploadRouteToPod(newRoute);
        getState().route.routes[getState().route.routes.length]=newRoute;
        //console.log(getState());
        dispatch({
            type: 'UPLOAD_ROUTE',
            payload: newRoute
        });
    };
}

