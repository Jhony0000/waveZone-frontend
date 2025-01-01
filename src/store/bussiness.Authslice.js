import {createSlice} from '@reduxjs/toolkit'

const initialState =  {
    businessStatus : false,
    businessUserData : null
}

const businessAuthSlice = createSlice({
    name : 'businessAuth',
    initialState,
    reducers : {
        login : (state,actino)=> {
            state.businessStatus = true
            state.businessUserData = actino.payload.businessData
        },
        logout : (state)=>{
            state.businessStatus = false
            state.businessUserData = null
        }
    }
})

export const {login,logout} = businessAuthSlice.actions;

export  default businessAuthSlice.reducer

