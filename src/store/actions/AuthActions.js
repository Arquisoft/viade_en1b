export const logIn = (userWebId) =>{
    return (dispatch, getState) =>{
        //make async code
        getState().auth.userWebId = userWebId
        dispatch({
            type: 'LOG_IN',
            userWebId 
        })
    }
}

export const logOut = () =>{
    return (dispatch, getState) =>{
        //make async code
        getState().auth.userWebId = null
        dispatch({
            type: 'LOG_OUT',
        })
    }
}