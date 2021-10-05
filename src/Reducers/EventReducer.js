const initialState={
    events:[],
    activeEvent:null
}

export const EventReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Add New Event":
            return({
                ...state,
                events:[
                    ...state.events,
                    action.payload
                ]
            });
        case "Events Loading":
            return({
                ...state,
                events:[
                    ...action.payload
                ]
            });
        case "Update Event":
            return({
                ...state,
                events: state.events.map(eve => (eve._id === action.payload.id)?action.payload:eve)
            });
        case "Delete Event":
            return({
                ...state,
                events: state.events.filter(eve => (eve._id !== action.payload._id))
            });
        case "Set Active Event":
            return({
                ...state,
                activeEvent: action.payload,
            });

        case "Clean Active Event":
        return({
            ...state,
            activeEvent:null,
        });
        
        case "Logout Clean":
        return(initialState);    

        default:
            return state;
    }
}