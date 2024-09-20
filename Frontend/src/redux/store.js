import { configureStore } from "@reduxjs/toolkit";

import counterReducer from './counterslice'

console.lof(counterReducer);

const store = configureStore({
    reducer : {
        count : 
        counterReducer
    }
})

console.log(store)

export default store