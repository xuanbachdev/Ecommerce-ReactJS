import {createSlice} from '@reduxjs/toolkit'
export const totalProductSlice=createSlice({
    name:'totalProduct',
    initialState:0,
    reducers:{
        counterTotalProduct:(state)=>{
            let user=localStorage.getItem('email')
            if (localStorage.getItem(user)){
                let Storage=JSON.parse(localStorage.getItem(user))
                return state=Storage.length
            }
            else return 0
        },
        counterTotalProduct2:(state,action)=>{
            return state=action.payload
        }
    }
})

export default totalProductSlice.reducer
export const {counterTotalProduct,counterTotalProduct2} =totalProductSlice.actions