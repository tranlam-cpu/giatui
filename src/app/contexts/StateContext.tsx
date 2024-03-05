"use client"
import { createContext, useReducer } from "react";
import { stateReducer } from "../reducers/stateReducer";

export const StateContext = createContext({})

const StateContextProvider = ({ children }: any) => {
    const [state,dispatch]=useReducer(stateReducer,{
        stateUpload:false,
    })


    //set state upload
    const setStorageStateUpload = async (value:boolean) => {
        dispatch({
            type: "SET_STATE_UPLOAD",
            payload: {
                stateUpload: value
            }
        })
    }

    // Context data
    const stateContextData = { state , setStorageStateUpload }




    return (
        <StateContext.Provider value={stateContextData}>
            {children}
        </StateContext.Provider>
    )
}

export default StateContextProvider