import {configureStore} from '@reduxjs/toolkit'
import counterProduct from '~/redux/reducer/totalProductSlice'
import amountProduct from '~/redux/reducer/amountSlice'
import favourite from '~/redux/reducer/favourite'
import oneProduct from '~/redux/reducer/data1Product'
import authReducer from '~/redux/reducer/authSlice'

export const store = configureStore({
    reducer: {
       counterProduct,
       amountProduct,
       favourite,
       oneProduct,
       authReducer
    }
})