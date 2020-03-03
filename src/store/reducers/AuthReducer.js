const initState = {
    userWebId: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOG_IN':
            console.log("user loggedin", action.userWebId)
            return {...state}
        case 'LOG_IN':
            console.log("user loggedOUT")
            return {...state}
        default:
            return state
    }
}
export default authReducer