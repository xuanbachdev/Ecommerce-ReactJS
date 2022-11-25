import {createSlice} from '@reduxjs/toolkit'

const favouriteSlice = createSlice({
    name: "favourite",
    initialState: [],
    reducers: {
        addProduct: (state,actions) => {
         return [...state,actions.payload]
        },
        deleteProduct: (state,actions) => {
            const clone = [...state]
            const newProduct = clone.filter(item => item._id !== actions.payload._id)
            return newProduct
        }
    }
})
export const {addProduct,deleteProduct} = favouriteSlice.actions
export default favouriteSlice.reducer