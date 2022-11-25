import {createSlice} from '@reduxjs/toolkit'

export const oneProductSlice=createSlice({
    name:'oneProduct',
    initialState:{},
    reducers:{
        setOneData: (state,action)=>{
            return state=action.payload
        }
    }
})

export default oneProductSlice.reducer
export const {setOneData} =oneProductSlice.actions