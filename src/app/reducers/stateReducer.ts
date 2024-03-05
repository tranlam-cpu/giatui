export const stateReducer = (state: any, action: any) => {
    const {type, payload:{stateUpload}} = action
    
    switch (type) {
        case "SET_STATE_UPLOAD":
            return {
                ...state,
                stateUpload
            }
        default:
            return state
    }
}