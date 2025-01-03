import { configureStore } from "@reduxjs/toolkit";
import businessAuthslice from './bussiness.Authslice'

const businessStore = configureStore({
    reducer : {
        auth : businessAuthslice
    }
})

export default businessStore;
