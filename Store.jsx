import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./src/Feature/BlogSlice"
import loginReducer from "./src/Feature/LoginSlice"
import signupReducer from "./src/Feature/SignupSlice"

export const store = configureStore({
    reducer: {

        blog: blogReducer,
        login: loginReducer,
        signup: signupReducer

    }
})