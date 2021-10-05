const initialState={
    openModal: false
}

export const ModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case "openModal":
            return({
                ...state,
                openModal: true,
            });
            
            case "closeModal":
                return({
                    ...state,
                    openModal: false,
                });

        default:
            return state;
    }
}
