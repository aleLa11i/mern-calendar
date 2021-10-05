const initialState = {
    check:true,
    uid: null,
    name:null
}


export const AuthReducer = (state = initialState, action) => {

    switch (action.type) {
        case "Login":
            return ({
                ...state,
                ...action.payload,
                check: false
            })

        case "Logout":
        return  {check: true}

        case "Finish Checking":
            return {
                ...state,
                check:false
            }
    
        default:
            return state;
    }
}
