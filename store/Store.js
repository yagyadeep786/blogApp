import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice"


let Store= configureStore({
    reducer:{
        auth:authReducer
    }
})

export default Store;